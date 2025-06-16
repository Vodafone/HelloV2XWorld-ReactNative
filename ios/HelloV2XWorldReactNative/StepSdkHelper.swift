//
//  StepSdkHelper.swift
//  ReactNative4IOS
//
//  Created by Aya Hamoud on 02/05/2024.
//

import Foundation
import VodafoneV2X
import Combine

@objc(StepSdkHelper)
public class StepSdkHelper: NSObject, DIContainerProvider {

  @objc
  static var sharedInstance: StepSdkHelper = StepSdkHelper()

  private var itsLocationReceiver: ITSLocationsListProvider? { container?.resolve() }
  private var positionUpdates: AnyCancellable?
  private var mqttCancellable: AnyCancellable?
  private var mqttServiceCancellable: AnyCancellable?
  private var camListenerCancellable: AnyCancellable?
  var camListProvider: CAMListProvider?
  var alreadyInitialized = false
  var lastITSHeading = 0.0

  @objc
  public func initSDK(credentials: [String: String]) {
    DispatchQueue.main.async {
      let stationTypeId = credentials["STATION_TYPE_ID"] ?? ""
      self.updateStationType(stationType: Int(stationTypeId) ?? 0)
      if !self.alreadyInitialized {
        self.initV2XService(appId: credentials["APP_ID"] ?? "", appToken: credentials["APP_TOKEN"] ?? "", camPublishGroup: credentials["CAM_PUBLISH_GROUP"] ?? Constant.camPublishGroup, camSubscribeGroup: credentials["CAM_SUBSCRIBE_GROUP"] ?? Constant.camSubscribeGroup)
        self.setupConnectivityListener()
        self.startCAMService()
        self.alreadyInitialized = true
      }
    }
  }

  @objc
  public func stopSDK() {
    if container?.camService?.isActive == true {
      _ = self.container?.camService?.stop()
    }
    mqttCancellable?.cancel()
    camListenerCancellable?.cancel()
    positionUpdates?.cancel()
  }

  @objc
  public func updateStationType(stationType: Int) {
    if (ConfigsOnDemand.stationType.rawValue != stationType) {
      self.alreadyInitialized = false;
      if let newStationType = StationKind.init(rawValue: UInt(stationType)), newStationType != .unknown {
        ConfigsOnDemand.stationType = newStationType
      } else {
        ConfigsOnDemand.stationType = .passengerCar
      }
    }
  }

  private func initV2XService(appId: String, appToken: String, camPublishGroup: String, camSubscribeGroup: String) {
    let mqttConfig = V2XMQTTConfigurator(stepInstance:V2XMQTTConfigurator.STEPInstance(rawValue: Constant.stepInstance), username: appId, pass: appToken, reconnect: nil, serviceAreaHandoverConfig: .none)
    let locationServConfig = ServiceConfiguration(expiration: 5)
    let camSubServiceGroup = MQTTSubServiceGroup(publish: camPublishGroup, subscribe: camSubscribeGroup)
    let camServConfig = ServiceConfiguration(expiration: 5, subServiceGroup: camSubServiceGroup, txRxRole: RxTxRoles(tx: true, rx: true))
    let listServices = ListServices(location: locationServConfig, cam: camServConfig, denm: nil, ivim: nil, mapem: nil, spatem: nil, vam: nil, cpm: nil, poim: nil, custom: nil)
    let config = V2XConfigurator(mqtt: mqttConfig, services: listServices, vehicleDimentions: nil, gnssEmulationEndPoint: nil, iccService: nil)
    V2XDIContainer.setupDIContainer(with: config, geohashing: nil)
  }

  private func startCAMService() {
    if container?.camService?.isActive == false {
      _ = self.container?.camService?.start()
    }
  }

  private func setupConnectivityListener() {
    guard let mqttService = container?.mqttClient, mqttCancellable == nil  else { return }
    mqttCancellable = mqttService.connectionState.receive(on: RunLoop.main).sink { connectionState in
      if connectionState == .connected {
        self.setupEventListeners()
      }
      NotificationCenter.default.post(name: NSNotification.Name("SendNewEvent"), object: self, userInfo: ["Data": self.processConnectionStatus(status: connectionState.rawValue), "EventName": "V2X_CONNECTIVITY_STATE_CHANGED"])
    }
  }

  private func setupEventListeners() {
    // ITS Event Listener
    positionUpdates = itsLocationReceiver?.listChanged.receive(on: RunLoop.main).sink(receiveValue: { locations in
      let mostRecentLocation = locations.last
      if (mostRecentLocation != nil && mostRecentLocation?.object != nil) {
        NotificationCenter.default.post(name: NSNotification.Name("SendNewEvent"), object: self, userInfo: ["Data": self.processITS(event: mostRecentLocation!.object!), "EventName": "ITS_LOCATION_LIST_CHANGED"])
      }
    })

    // CAM Event Listener
    guard let listProvider = container?.camListProvider else { return }
    camListProvider = listProvider
    self.camListenerCancellable = listProvider.listChanged.receive(on: RunLoop.main).sink(receiveValue: { CAMList in
      NotificationCenter.default.post(name: NSNotification.Name("SendNewEvent"), object: self, userInfo: ["Data": self.processCAM(camRecords: CAMList), "EventName": "CAM_LIST_CHANGED"])
    })
  }

  // MARK: Events data packs processors
  private func processCAM(camRecords: [V2XCAM]) -> NSDictionary {
    var cams: [[String: Any?]] = []
    for record in camRecords {
      let heading = record.object?.headingDegrees ?? 0.0
      if record.object?.stationID != ConfigsOnDemand.stationID {
        cams.append([
          "stationId": "\(record.object?.stationID ?? UInt())",
          "stationType": record.object?.stationType.rawValue,
          "bearing": (heading > 0) ? heading : 0,
          "latitude": record.object?.coordinate.latitude,
          "longitude": record.object?.coordinate.longitude,
          "speed": record.object?.speedKmH
        ])
      }
    }
    return ["cams": cams]
  }

  private func processITS(event: VodafoneV2X.V2XCLLocation) -> NSDictionary {
    if(event.location.course > 0){
      lastITSHeading = event.location.course
    }
    return [
      "stationId": "\(ConfigsOnDemand.stationID)",
      "stationType": ConfigsOnDemand.stationType.rawValue,
      "bearing": lastITSHeading,
      "latitude": event.location.coordinate.latitude,
      "longitude": event.location.coordinate.longitude,
      "speed": event.location.speed
    ]
  }

  private func processConnectionStatus(status: String) -> NSDictionary {
    return [
      "stationId": "\(ConfigsOnDemand.stationID)",
      "connectivity": status
    ]
  }
}
