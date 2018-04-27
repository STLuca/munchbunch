import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';
import { Comment } from '../../../data/models/comment.model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],

})
export class CommentFormComponent implements OnInit {

  @Input() replyToID: string;
  @Input() resource: string;
  @Input() uid: string;
  @Output() createComment = new EventEmitter<Comment>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      comment: ['', Validators.compose([Validators.required, Validators.maxLength(255)])]
    });
  }

  submit() {
    if (this.form.valid && this.uid) {
      const comment: Comment = {
        id: this.afs.createId(),
        commenteeID: this.replyToID,
        userID: this.uid,
        comment: this.form.get('comment').value,
        timestamp: Date.now()
      };
      this.createComment.emit(comment);
    }

  }
}
