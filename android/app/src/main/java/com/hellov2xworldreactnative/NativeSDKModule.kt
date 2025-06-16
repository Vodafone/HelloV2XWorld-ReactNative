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
import com.vodafone.v2x.sdk.android.AndroidV2XSDK
import com.vodafone.v2xsdk4javav2.facade.SDKConfiguration
import com.vodafone.v2xsdk4javav2.facade.enums.LogLevel
import com.vodafone.v2xsdk4javav2.facade.enums.ServiceMode
import com.vodafone.v2xsdk4javav2.facade.enums.StationType
import com.vodafone.v2xsdk4javav2.facade.events.BaseEvent
import com.vodafone.v2xsdk4javav2.facade.events.EventCamListChanged
import com.vodafone.v2xsdk4javav2.facade.events.EventITSLocationListChanged
import com.vodafone.v2xsdk4javav2.facade.events.EventListener
import com.vodafone.v2xsdk4javav2.facade.events.EventType
import com.vodafone.v2xsdk4javav2.facade.events.EventV2XConnectivityStateChanged
import com.vodafone.v2xsdk4javav2.facade.exceptions.InvalidConfigException

class NativeSDKModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), EventListener {

    private val parameters: Parameters = Parameters(reactContext)
    private var sdkConfiguration: SDKConfiguration = SDKConfiguration.builder().build()
    private val isCAMServiceEnabled = true;

    override fun getName(): String = "NativeSDKModule"

    @ReactMethod
    fun initSDK(appId: String, appToken: String, camPublishGroup: String, camSubscribeGroup: String) {
        parameters.setApplicationId(appId)
        parameters.setApplicationToken(appToken)
        parameters.setCamPublishGroup(camPublishGroup)
        parameters.setCamSubscribeGroup(camSubscribeGroup)
        if (!AndroidV2XSDK.getInstance().isV2XServiceInitialized) initV2XService()
        if (!AndroidV2XSDK.getInstance().isV2XServiceRunning) startV2XService()
        if (AndroidV2XSDK.getInstance().isV2XServiceInitialized && AndroidV2XSDK.getInstance().isV2XServiceRunning) {
            AndroidV2XSDK.getInstance().subscribe(this, EventType.CAM_LIST_CHANGED, EventType.ITS_LOCATION_LIST_CHANGED, EventType.V2X_CONNECTIVITY_STATE_CHANGED)
            if (!AndroidV2XSDK.getInstance().isCAMServiceRunning && isCAMServiceEnabled) {
                try {
                    AndroidV2XSDK.getInstance().startCAMService()
                } catch (e: IllegalStateException) {
                    e.printStackTrace()
                }
            }
        }
    }

    private fun initV2XService() {
        try {
            val cfg = SDKConfiguration.builder()
                .applicationID(parameters.applicationID)
                .applicationToken(parameters.applicationToken)
                .stationType(parameters.stationType)
                .camServiceMode(ServiceMode.TxAndRx)
                .camPublishGroup(parameters.camPublishGroup)
                .camSubscribeGroup(parameters.camSubscribeGroup)
            sdkConfiguration = cfg.build()
            if (BuildConfig.BUILD_TYPE == "debug") AndroidV2XSDK.getInstance().setLogLevel(LogLevel.DEBUG)
            else AndroidV2XSDK.getInstance().setLogLevel(LogLevel.OFF)
            AndroidV2XSDK.getInstance().initV2XService(reactApplicationContext, sdkConfiguration)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun startV2XService() {
        try {
            if (!AndroidV2XSDK.getInstance().isV2XServiceRunning) AndroidV2XSDK.getInstance().startV2XService(0, null)
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
        if (AndroidV2XSDK.getInstance().isV2XServiceInitialized && AndroidV2XSDK.getInstance().isV2XServiceRunning) {
            if (AndroidV2XSDK.getInstance().isCAMServiceRunning) AndroidV2XSDK.getInstance().stopCAMService()
            AndroidV2XSDK.getInstance().unsubscribe(this)
            AndroidV2XSDK.getInstance().stopV2XService()
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
        val userStationId = AndroidV2XSDK.getInstance().stationId
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
            map.putString("stationId", AndroidV2XSDK.getInstance().stationId.toString())
            map.putInt("stationType", AndroidV2XSDK.getInstance().stationType.value)
            map.putDouble("bearing",  (event.list[0]?.location?.bearingInDegree ?: 0.0).toDouble())
            map.putDouble("latitude", event.list[0].location.latitude)
            map.putDouble("longitude", event.list[0].location.longitude)
            map.putDouble("speed", (event.list[0]?.location?.speedInKmPerHour ?: 0.0).toDouble())
        }
        return map
    }

    private fun processConnectionStatus(event: EventV2XConnectivityStateChanged): WritableMap {
        val map: WritableMap = WritableNativeMap()
        map.putString("stationId", AndroidV2XSDK.getInstance().stationId.toString())
        map.putString("connectivity", event.connectivityState.name)
        return map
    }
}
