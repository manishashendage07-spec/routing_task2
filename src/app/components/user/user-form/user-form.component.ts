import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iusers } from 'src/app/models/users';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UsersService } from 'src/app/service/users.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  usersId!: string;
  userDetails!: Iusers
  isInEditMode: boolean = false;
  constructor(
    @Inject(UsersService) private _usersservice: UsersService,
    private _router: Router,
    @Inject(SnackbarService) private _snakbar: SnackbarService,
    private _routes: ActivatedRoute,
    @Inject(UtilityService) private _uilty: UtilityService
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.addskillcontrol()
    this.patchUser()
    this.formControl['address'].get('current')?.valueChanges
      .subscribe(val => {
        if (this.formControl['address'].get('current')?.valid) {
          this.formControl['isAddSame'].enable()
        } else {
          this.formControl['isAddSame'].reset()
          this.formControl['isAddSame'].disable()
        }
      })
    this.formControl['isAddSame'].valueChanges
      .subscribe(val => {
        if (val) {
          let currentAdd = this.formControl['address'].get('current')?.value;
          this.formControl['address'].get('permanent')?.patchValue(currentAdd)
          this.formControl['address'].get('permanent')?.disable()
        } else if (this.isInEditMode && !val) {
          this.formControl['address'].get('permanent')?.patchValue(this.userDetails.address.permanent)
          this.formControl['address'].get('permanent')?.enable()
        } else {
          this.formControl['address'].get('permanent')?.reset()
          this.formControl['address'].get('permanent')?.enable()
        }
      })
  }

  Onremove() {
    if (this.skillsArr.length > 1) {
      this.skillsArr.removeAt(this.skillsArr.length - 1);
    } else {
      alert('At least one skill is required.');
    }
  }
  createUserForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl('buyer'),
      profileDescription: new FormControl(null, [Validators.required]),
      profileImage: new FormControl(null, [Validators.required]),
      experienceYears: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      isAddSame: new FormControl({ value: null, disabled: true }, [Validators.required]),
      address: new FormGroup({
        current: new FormGroup({
          country: new FormControl('India'),
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          zipcode: new FormControl(null, [Validators.required]),

        }),
        permanent: new FormGroup({
          country: new FormControl('India'),
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          zipcode: new FormControl(null, [Validators.required]),
        })
      }),
      skills: new FormArray([])
    })
  }

  addskillcontrol() {
    if (this.formControl['skills'].valid) {
      let skillControl = new FormControl(null, [Validators.required])
      this.skillsArr.push(skillControl)
    }
  }

  get formControl() {
    return this.userForm.controls
  }

  get skillsArr() {
    return this.formControl['skills'] as FormArray
  }


  onUsersubmit() {
    if (this.userForm.invalid) {
      console.log(this.userForm);
      this.userForm.markAllAsTouched();
      return;
    }
    let userDetails: Iusers = {
      ...this.userForm.getRawValue(),
      userId: Date.now().toString()
    };
    this._usersservice.createusers(userDetails).subscribe({
      next: (data: { msg: any; }) => {
        console.log(data);
        this.userForm.reset()
        this._router.navigate(['/users'])
        this._snakbar.openSuccessSnackbar(data.msg)
      },
      error: (err: { msg: any; }) => {
        this._snakbar.openErrorSnackbar(err.msg)
      }
    });
  }

  patchUser() {
    this._routes.params.subscribe(params => {
      this.usersId = params['uid'];
      if (this.usersId) {
        this.isInEditMode = true;
        this._usersservice.fetchuserId(this.usersId)
          .subscribe({
            next: (data: Iusers) => {
              console.log(data);
              this.userDetails = data
              this.userForm.patchValue(data)
              this._uilty.utilitycontrol(this.userDetails.skills, this.skillsArr)
              if (this.formControl['address'].get('current')?.valid) {
                this.formControl['isAddSame'].enable()
                this.formControl['address'].get('permanent')?.patchValue(this.userDetails.address.permanent)
              }
            },

            error: (err: { msg: any; }) => {
              console.log(err.msg);
            }

          })
      }
    })
  }

  onUpdateuser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
      return;
    } else {
      let upd_obj = {
        ...this.userForm.getRawValue(),
        userId: this.usersId
      }

      this._usersservice.updateuser(upd_obj)
        .subscribe({
          next: (data: { msg: any; }) => {
            this.isInEditMode = false
            this._router.navigate(['/users', upd_obj.userId])
            this._snakbar.openSuccessSnackbar(data.msg)
          },
          error: (err: { msg: any; }) => {
            this._snakbar.openErrorSnackbar(err.msg)
          }
        })
    }
  }

  canDeactivate() {
    if (this.userForm.dirty && this.isInEditMode) {
      let getconfirm = confirm(`Are you sure do tou want to disacard the changes?`)
      return getconfirm
    }
    return true
  }
}