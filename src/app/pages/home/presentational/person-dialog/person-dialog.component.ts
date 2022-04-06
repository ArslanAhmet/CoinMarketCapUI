import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonItem } from 'src/app/shared/models';
import { HomePageActions } from './../../store/actions';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers/home-reducers';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.scss']
})
export class PersonDialogComponent implements OnInit {
  personForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { Name, Email}: PersonItem,
    private store: Store<State>) {

     }

  ngOnInit(): void {
    this.personForm = this.fb.group({
      Name: ['', [Validators.required, Validators.min(0)]],
      Email: ['', [Validators.required,  Validators.email]],
    });

  }
  saveUser(formValues:any) {
    let personItem: PersonItem = {
      id: 0,
      Type:1,
      Name: formValues.Name,
      Email: formValues.Email,
      Language:''
    };
    this.store.dispatch(HomePageActions.createPerson( {payload: personItem} ))

    this.dialogRef.close( {payload: personItem});

  }
  dismiss() {
    this.dialogRef.close(null);
  }
}

