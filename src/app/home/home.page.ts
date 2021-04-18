import { Component } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
import { isPlatform } from '@ionic/core';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

const { Camera, Contacts } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  contacts = [];

  constructor(private openNactiveSettings:OpenNativeSettings ) {
  }

  async loadContacts(){
    if(isPlatform('android')){
      let permission = await Contacts.getPermissions();
      if(!permission.granted){
        return;
      }
    }

    Contacts.getContacts().then(result=>{
      this.contacts = result.contacts;
    });
  }

  async takePicture(imageElement:HTMLImageElement) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    imageElement.src = imageUrl;
  }

  openSettings(){
    this.openNactiveSettings.open("settings");
  }
}
