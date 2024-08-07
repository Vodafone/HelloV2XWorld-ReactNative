# HelloV2XWorld-ReactNative

In this repository you can find an example of V2X application that shows how to use the V2X-SDK in a ready to use React Native (Android/iOS) Application.

## Description

The HelloV2XWorld application demonstrates how easy it is to create a V2X application and exchange V2X messages with other road users .
This application is powered by the V2X-SDK and the STEP platform developed by Vodafone.
By cloning this project, you will be able to create and execute your first V2X application in less than 15 minutes.
The HelloV2XWorld application shows a map with all the road users close to your location.
You can also use this application as a model to start developing your own application.

## Getting Started

### Prerequisites

* Android Studio (2022.1.1 or upper) / XCode, Intellij IDEA or VS Code already installed on your laptop.
* Xcode version 14.1 or higher is already installed on your MacBook.
* A software able to open rar & zip archives is already installed on your laptop.
* You have some experience in React Native application development in JavaScript/TypeScript.
* You already created One virtual device in Android Studio (Android 8 or higher).
* You already created One virtual device in XCode.
* Your Internet connectivity is up and running.
* You are available for 15 minutes.

### Download the V2X-SDK library for Android

* Register yourself on the [STEP Web portal](https://step.vodafone.com/)    
  ![STEPWP_Signup_Annoted](https://user-images.githubusercontent.com/124599387/219050113-50e5a149-1559-4776-af0f-30d3ad16c5ef.png)

* Go to the [STEP Web portal](https://step.vodafone.com/) webpage and login.  
  **=>Enter your credentials**   
  ![STEPWP_Login1_Annoted](https://user-images.githubusercontent.com/124599387/219050444-cf48a53c-60e4-458a-a021-5841a789ccc6.png)  
  **=>Enter your pin Code**   
  ![STEPWP_Login2_annoted](https://user-images.githubusercontent.com/124599387/219347713-ae3ab91e-092d-4222-9241-91898eb10907.png)

* Navigate to the Access SDK page and select the "Get SDK for Android" option.  
  ![image](readme_images/android-8.png)

* In the "SDK documentation for Android" page , click on the "Download SDK" button.  
  ![image](https://user-images.githubusercontent.com/122537808/217475876-45c8af5d-c11e-42f9-93cb-eb76ecfa7e44.png)  
  **=> Your browser downloads the archive "VodafoneV2X_Android_SDK.rar"**
* Open the archive, extract the V2X-SDK library file called "v2xsdk-release.aar" and save it on your laptop.

### Download the Android V2X-SDK documentation

* In the "SDK documentation for Android" page , click on the "Download documentation" button.  
  ![image](https://user-images.githubusercontent.com/122537808/217552264-0fb27214-1d75-424b-8740-71678e837216.png)

  **=> Your browser downloads the archive "Android_V2X_SDK_Documentation_Vabc.zip"**
* Open the archive and save on your laptop the Javadoc and the user Guide

### Download the V2X-SDK library for iOS

* Navigate to the Access SDK page and select the "Get SDK for iOS" option.
  ![image](readme_images/ios-8.png)

* In the "SDK documentation for iOS" page.
  * click on the "Download SDK" button for the SDK xcframework.
  * click on the "Download documentation" button for the SDK documentation and user guide.
    ![image](https://user-images.githubusercontent.com/124599387/219348935-697b4ad1-2ac5-4689-9e14-184683b86f47.png)

=> Your browser downloads the archive "VodafoneV2X_iOS_SDK.rar".
* Open the archive, extract the V2X-SDK library file called "VodafoneV2X.xcframework" and save it on your laptop.


### Retrieve the Application_ID & Application_Token, you will need these 2 parameters later to configure the HelloV2XWorld app.

* Go the [Test application](https://de-he.step.vodafone.com/applications) Test Application Web page.
* Click on the Test Application button

![TestApplicationButton](https://github.com/Vodafone/HelloV2XWorld-Android/assets/122537808/f0ca89ed-241c-472c-a4f4-3b5ab5d1b856)

* Click on the Next Button two times
* Select the Application ID option and Copy the ApplicationID and save it as ApplicationID

![TestAppID](https://github.com/Vodafone/HelloV2XWorld-Android/assets/122537808/2945bf3d-e6fe-4b33-8a58-845a612256f8)

* Select the SDK Key option , copy the SDK Key and save it as ApplicationToken

![TestAppToken](https://github.com/Vodafone/HelloV2XWorld-Android/assets/122537808/c4ac1a74-ca59-4faa-82c5-2eae6cd4f6f1)


### Clone the HelloV2XWorld Application

* Open Intellij IDEA.
* From start Screen select Get from VCS.  
  ![image](readme_images/1.png)  
  **=> A window called "Get from Version Control" appears.**

* In the field version Control select the option "Git".
* In the field URL set "https://github.com/Vodafone/HelloV2XWorld-ReactNative.git".
* Click on the "Clone" button.  
  ![image](readme_images/2.png)

* Wait until the completion of this operation.

### Import the Android V2X-SDK library in your project

* Copy the "v2xsdk-release.aar" file to the app/libs folder of your project.  
  ![image](readme_images/3.png)


### Import the iOS V2X-SDK library in your project

* After opening the HelloV2XWorld project.
* Go to xcodproj settings page "General".
* Scroll down to "Frameworks" and click on the "+" sign.
  ![image](readme_images/5.png)
* Choose "Add Others" then "Add Files" and select to add the pre-downloaded "VodafoneV2X.xcframework".
  ![image](readme_images/6.png)


### Set the Application_ID & Application_Token in your project

![AStudio](readme_images/4.png)


### Set the Google Maps API Key for Android

* In Android App Manifest, replace the "GOOGLE_MAPS_API_KEY" with your google API key".

![AStudio](readme_images/android-9.png)


### Build the HelloV2XWorld application

* Open Terminal in project directory and run:
* react-native start
* For Android: npx react-native run-android
* For iOS: npx react-native run-ios


### Run the HelloV2XWorld application on the virtual devices

**Please, be aware that the HelloV2XWorld application needs to access to your location , it's why it requests the Location Permission.**  

* Read the Term and Conditions, Scroll down and click on the "Accept" button.  
  ![image](readme_images/android-1.png)
  ![image](readme_images/ios-1.png)


* Provide the Location Permission to the HelloV2XWorld application  
  ![image](readme_images/android-2.png)
  ![image](readme_images/ios-2.png)


* A map is displayed centered on your current location  
  ![image](readme_images/android-7.png)
  ![image](readme_images/ios-7.png)


* The blue icon represents yourself
* The red icons represent the other road users close to you   
  ![image](readme_images/android-3.png)
  ![image](readme_images/ios-3.png)


* When clicking on the blue icon, app displays you ITS information: StationID, StationType, Speed, Heading
  ![image](readme_images/android-4.png)
  ![image](readme_images/ios-4.png)


* When clicking on any red icon, app displays you the CAM information: StationID, StationType, Speed, Heading
  ![image](readme_images/android-5.png)
  ![image](readme_images/ios-5.png)


* You can change your station type by accessing the setting page
  ![image](readme_images/android-6.png)
  ![image](readme_images/ios-6.png)

## Version History

* 1.0.3
  * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
