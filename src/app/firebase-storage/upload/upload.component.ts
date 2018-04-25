import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploadProgress: Observable<number>;
  @Output() uploadedUrl: EventEmitter<string> = new EventEmitter<string>();

  constructor(private afStorage: AngularFireStorage) { }
  upload(event) {
    const randomId = Math.random().toString(36).substring(2);

    const task = this.afStorage.upload(randomId, event.target.files[0]);
    this.uploadProgress = task.percentageChanges();
    task.downloadURL().subscribe(url => this.uploadedUrl.emit(url));
  }

  ngOnInit() {
  }

}
