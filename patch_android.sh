sed -i 's/<string name="GOOGLE_MAPS_API_KEY_ANDROID">YOUR_GOOGLE_MAPS_API_KEY_ANDROID<\/string>//' apps/mobile/android/app/src/main/res/values/strings.xml
sed -i '3i\apply from: project(":react-native-config").projectDir.getPath() + "/dotenv.gradle"' apps/mobile/android/app/build.gradle
