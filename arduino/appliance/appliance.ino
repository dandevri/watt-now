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
    
  potentioMeter = analogRead(POTENTIO_METER);

  if (potentioMeter < 89) {
    printDebugMessage("0 procent");
    sendExpressRotate("0");
  } else if(potentioMeter < 178) {
    printDebugMessage("10 procent");
    sendExpressRotate("10");
  } else if(potentioMeter < 267) {
    printDebugMessage("20 procent");
    sendExpressRotate("20");
  } else if(potentioMeter < 356) {
    printDebugMessage("30 procent");
    sendExpressRotate("30");
  } else if(potentioMeter < 445) {
    printDebugMessage("40 procent");
    sendExpressRotate("40");
  } else if(potentioMeter < 534) {
    printDebugMessage("50 procent");
    sendExpressRotate("50");
  } else if(potentioMeter < 623) {
    printDebugMessage("60 procent");
    sendExpressRotate("60");
  } else if(potentioMeter < 712) {
    printDebugMessage("70 procent");
    sendExpressRotate("70");
  } else if(potentioMeter < 801) {
    printDebugMessage("80 procent");
    sendExpressRotate("80");
  } else if(potentioMeter < 890) {
    printDebugMessage("90 procent");
    sendExpressRotate("90");
  } else if(potentioMeter > 979) {
    printDebugMessage("100 procent");
    sendExpressRotate("100");
  }

  delay(100);
 
}

void sendExpressRotate(String energyLevel)
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


