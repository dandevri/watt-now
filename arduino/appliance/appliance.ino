#include <OpenWiFi.h>

#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiManager.h>
#include "SpringyValue.h"
#include "config.h"

int oscillationTime = 500;
int potentioMeter = 0;
String chipID;
String expressURL = EXPRESS_URL;
int volumeState = 0;
OpenWiFi hotspot;

void printDebugMessage(String message) {
#ifdef DEBUG_MODE
  Serial.println(String(PROJECT_SHORT_NAME) + ": " + message);
#endif
}

void setup()
{

  Serial.begin(115200);

  WiFiManager wifiManager;
  int counter = 0;

  hotspot.begin(BACKUP_SSID, BACKUP_PASSWORD);

  chipID = generateChipID();
  printDebugMessage(String("Last 2 bytes of chip ID: ") + chipID);
  String configSSID = String(CONFIG_SSID) + "_" + chipID;

  wifiManager.autoConnect(configSSID.c_str());
}

void loop()
{
  // Potentiometer 0...1024
  potentioMeter = analogRead(POTENTIO_METER);

  // Convert 0...1024 to 0...100
  sendExpressRotate(potentioMeter / 977.0 * 100);

  delay(1000);
}

void sendExpressRotate(float energyLevel)
{
  //Express server api call
  printDebugMessage("Sending rotation to node server");
  String url = expressURL + "/api/energy?level=";
  HTTPClient http;
  http.begin(url + energyLevel);
  int httpCode = http.GET();

  if (httpCode == 200) {
    String res;
    res = http.getString();
    if (res) { printDebugMessage("Express response: " + res); }
    else { printDebugMessage("Something went wrong"); }
  } else {
    printDebugMessage("Connection failed. Return " + String(httpCode));
  }

  http.end();
}

String generateChipID()
{
  String chipIDString = String(ESP.getChipId() & 0xffff, HEX);

  chipIDString.toUpperCase();
  while (chipIDString.length() < 4)
    chipIDString = String("0") + chipIDString;

  return chipIDString;
}
