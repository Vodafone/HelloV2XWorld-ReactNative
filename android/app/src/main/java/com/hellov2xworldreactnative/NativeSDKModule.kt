package com.hellov2xworldreactnative

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.vodafone.v2x.sdk.android.facade.SDKConfiguration
import com.vodafone.v2x.sdk.android.facade.SDKConfiguration.SDKConfigurationBuilder
import com.vodafone.v2x.sdk.android.facade.V2XSDK
import com.vodafone.v2x.sdk.android.facade.enums.LogLevel
import com.vodafone.v2x.sdk.android.facade.enums.MqttClientKind
import com.vodafone.v2x.sdk.android.facade.enums.ServiceMode
import com.vodafone.v2x.sdk.android.facade.enums.StationType
import com.vodafone.v2x.sdk.android.facade.events.BaseEvent
import com.vodafone.v2x.sdk.android.facade.events.EventCamListChanged
import com.vodafone.v2x.sdk.android.facade.events.EventITSLocationListChanged
import com.vodafone.v2x.sdk.android.facade.events.EventListener
import com.vodafone.v2x.sdk.android.facade.events.EventType
import com.vodafone.v2x.sdk.android.facade.events.EventV2XConnectivityStateChanged
import com.vodafone.v2x.sdk.android.facade.exception.InvalidConfigException

class NativeSDKModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), EventListener {

    private val parameters: Parameters = Parameters(reactContext)
    private var sdkConfiguration: SDKConfiguration = SDKConfigurationBuilder().build()

    override fun getName(): String = "NativeSDKModule"

    @ReactMethod
    fun initSDK(appId: String, appToken: String, camPublishGroup: String, camSubscribeGroup: String) {
        parameters.setApplicationId(appId)
        parameters.setApplicationToken(appToken)
        parameters.setCamPublishGroup(camPublishGroup)
        parameters.setCamSubscribeGroup(camSubscribeGroup)
        if (!V2XSDK.getInstance().isV2XServiceInitialized) initV2XService()
        if (!V2XSDK.getInstance().isV2XServiceStarted) startV2XService()
        if (V2XSDK.getInstance().isV2XServiceInitialized && V2XSDK.getInstance().isV2XServiceStarted) {
            V2XSDK.getInstance().subscribe(this, EventType.CAM_LIST_CHANGED, EventType.ITS_LOCATION_LIST_CHANGED, EventType.V2X_CONNECTIVITY_STATE_CHANGED)
            if (!V2XSDK.getInstance().isCAMServiceRunning && sdkConfiguration.isCAMServiceEnabled) {
                try {
                    V2XSDK.getInstance().startCAMService()
                } catch (e: IllegalStateException) {
                    e.printStackTrace()
                }
            }
        }
    }

    private fun initV2XService() {
        try {
            val cfg = SDKConfigurationBuilder().withMqttClientKind(MqttClientKind.HiveMQv3)
            cfg.withMqttUsername(parameters.applicationID)
            cfg.withMqttPassword(parameters.applicationToken)
            cfg.withStationType(parameters.stationType)
            cfg.withCAMServiceEnabled(true)
            cfg.withCamServiceMode(ServiceMode.TxAndRx)
            cfg.withCAMPublishGroup(parameters.camPublishGroup)
            cfg.withCAMSubscribeGroup(parameters.camSubscribeGroup)
            sdkConfiguration = cfg.build()
            if (BuildConfig.BUILD_TYPE == "debug") V2XSDK.getInstance().setLogLevel(LogLevel.LEVEL_DEBUG)
            else V2XSDK.getInstance().setLogLevel(LogLevel.LEVEL_NONE)
            V2XSDK.getInstance().initV2XService(reactApplicationContext, sdkConfiguration)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun startV2XService() {
        try {
            if (!V2XSDK.getInstance().isV2XServiceStarted) V2XSDK.getInstance().startV2XService(0, null)
        } catch (e: InvalidConfigException) {
            e.printStackTrace()
        }
    }

    @ReactMethod
    fun updateStationType(type: Int) {
        if (type != parameters.stationType.value) {
            val stationType = StationType.entries.find { it.value == type } ?: StationType.PASSENGER_CAR
            parameters.setStationType(stationType)
        }
    }

    @ReactMethod
    fun stopSDK() {
        if (V2XSDK.getInstance().isV2XServiceInitialized && V2XSDK.getInstance().isV2XServiceStarted) {
            if (V2XSDK.getInstance().isCAMServiceRunning) V2XSDK.getInstance().stopCAMService()
            V2XSDK.getInstance().unsubscribe(this)
            V2XSDK.getInstance().stopV2XService()
        }
    }

    override fun onMessageBusEvent(event: BaseEvent) {
        when (event.eventType) {
            EventType.CAM_LIST_CHANGED -> emitMessage(EventType.CAM_LIST_CHANGED.name, processCAM(event as EventCamListChanged))
            EventType.ITS_LOCATION_LIST_CHANGED -> emitMessage(EventType.ITS_LOCATION_LIST_CHANGED.name, processITS(event as EventITSLocationListChanged))
            EventType.V2X_CONNECTIVITY_STATE_CHANGED -> emitMessage(EventType.V2X_CONNECTIVITY_STATE_CHANGED.name, processConnectionStatus(event as EventV2XConnectivityStateChanged))
            else -> { Log.d(name, "UnSupported Event Type ... ") }
        }
    }

    private fun emitMessage(event: String, data: WritableMap) {
        reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(event, data)
    }

    private fun processCAM(event: EventCamListChanged): WritableMap {
        val userStationId = V2XSDK.getInstance().sdkConfiguration.stationID
        val cams: WritableArray = WritableNativeArray()
        val map: WritableMap = WritableNativeMap()
        for (record in event.list) {
            if (record.stationID != userStationId) {
                val recordMap: WritableMap = WritableNativeMap()
                recordMap.putString("stationId", record.stationID.toString())
                recordMap.putInt("stationType", record.stationType)
                recordMap.putDouble("bearing", record.headingInDegree.toDouble())
                recordMap.putDouble("latitude", record.latitude.toDouble())
                recordMap.putDouble("longitude", record.longitude.toDouble())
                recordMap.putDouble("speed", record.speedInKmH.toDouble())
                cams.pushMap(recordMap)
            }
        }
        map.putArray("cams", cams)
        return map
    }

    private fun processITS(event: EventITSLocationListChanged): WritableMap {
        val map: WritableMap = WritableNativeMap()
        if (event.list.isNotEmpty()) {
            map.putString("stationId", V2XSDK.getInstance().sdkConfiguration.stationID.toString())
            map.putInt("stationType", V2XSDK.getInstance().sdkConfiguration.stationType.value)
            var bearing = 0.0
            if(event.list[0].location.bearingInDegree != null){
                bearing = event.list[0].location.bearingInDegree.toDouble()
            }
            map.putDouble("bearing",  bearing)
            map.putDouble("latitude", event.list[0].location.latitude)
            map.putDouble("longitude", event.list[0].location.longitude)
            var speed = 0.0
            if(event.list[0].location.speedInKmPerHour != null){
                speed = event.list[0].location.speedInKmPerHour.toDouble()
            }
            map.putDouble("speed", speed)
        }
        return map
    }

    private fun processConnectionStatus(event: EventV2XConnectivityStateChanged): WritableMap {
        val map: WritableMap = WritableNativeMap()
        map.putString("stationId", V2XSDK.getInstance().sdkConfiguration.stationID.toString())
        map.putString("connectivity", event.connectivityState.name)
        return map
    }
}
