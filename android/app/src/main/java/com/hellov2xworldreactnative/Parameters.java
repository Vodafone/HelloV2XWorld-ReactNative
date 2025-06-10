package com.hellov2xworldreactnative;

import android.content.Context;
import android.content.SharedPreferences;
import androidx.preference.PreferenceManager;
import com.vodafone.v2xsdk4javav2.facade.enums.StationType;

/**
 * Parameters class provides an interface to access the Vodafone V2X related preferences, including the acceptance of terms and conditions, the type of the station, and the application ID and token.
 * The class uses Android's SharedPreferences to store and retrieve the values.
 * The class is a singleton and should be obtained through the static method `getInstance`.
 */
public class Parameters {
    private final SharedPreferences sharedPref;
    private static final String STATION_TYPE_KEY = "com.vodafone.v2x.android.hellov2xworld.STATION_TYPE";
    private static final String APPLICATION_ID_KEY = "com.vodafone.v2x.android.hellov2xworld.APPLICATION_ID";
    private static final String APPLICATION_TOKEN_KEY = "com.vodafone.v2x.android.hellov2xworld.APPLICATION_TOKEN";
    private static final String CAM_PUBLISH_GROUP_KEY = "com.vodafone.v2x.android.hellov2xworld.CAM_PUBLISH_GROUP";
    private static final String CAM_SUBSCRIBE_GROUP_KEY = "com.vodafone.v2x.android.hellov2xworld.CAM_SUBSCRIBE_GROUP";

    public Parameters(Context context) {
        sharedPref = PreferenceManager.getDefaultSharedPreferences(context);
    }


    /**
     * Returns the type of the station.
     *
     * @return the type of the station
     */
    public StationType getStationType() {
        return StationType.valueOf(sharedPref.getString(STATION_TYPE_KEY, StationType.PASSENGER_CAR.toString()));
    }


    /**
     Set the type of the station.
     @param stationType the type of the station
     @return true if the value is successfully written to SharedPreferences
     */
    public boolean setStationType(StationType stationType) {
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(STATION_TYPE_KEY, stationType.toString());
        return editor.commit();
    }


    /**
     Get the application ID.
     @return the application ID
     */
    public String getApplicationID() {
        return sharedPref.getString(APPLICATION_ID_KEY, "APP_ID");
    }


    /**
     Set the application ID.
     @param applicationId the application ID
     @return true if the value is successfully written to SharedPreferences
     */
    public boolean setApplicationId(String applicationId) {
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(APPLICATION_ID_KEY, applicationId);
        return editor.commit();
    }


    /**
     Get the application token.
     @return the application token
     */
    public String getApplicationToken() {
        return sharedPref.getString(APPLICATION_TOKEN_KEY, "TOKEN");
    }


    /**
     Set the application token.
     @param applicationToken the application token
     @return true if the value is successfully written to SharedPreferences
     */
    public boolean setApplicationToken(String applicationToken) {
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(APPLICATION_TOKEN_KEY, applicationToken);
        return editor.commit();
    }


    /**
     Get the application CAM publish Group ID.
     @return the CAM publish Group
     */
    public String getCamPublishGroup() {
        return sharedPref.getString(CAM_PUBLISH_GROUP_KEY, "478346_22");
    }


    /**
     Set the application CAM publish Group ID.
     @param camPublishGroup the CAM publish Group
     @return true if the value is successfully written to SharedPreferences
     */
    public boolean setCamPublishGroup(String camPublishGroup) {
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(CAM_PUBLISH_GROUP_KEY, camPublishGroup);
        return editor.commit();
    }


    /**
     Get the application CAM Subscribe Group ID.
     @return the CAM Subscribe Group
     */
    public String getCamSubscribeGroup() {
        return sharedPref.getString(CAM_SUBSCRIBE_GROUP_KEY, "478346_22");
    }


    /**
     Set the application CAM Subscribe Group ID.
     @param camSubscribeGroup the CAM Subscribe Group
     @return true if the value is successfully written to SharedPreferences
     */
    public boolean setCamSubscribeGroup(String camSubscribeGroup) {
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(CAM_SUBSCRIBE_GROUP_KEY, camSubscribeGroup);
        return editor.commit();
    }
}
