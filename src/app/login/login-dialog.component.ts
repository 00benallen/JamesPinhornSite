import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LoginService } from "./login.service";

export interface LoginDialogData {
    username: string;
    password: string;
}

@Component({
    selector: 'login-dialog',
    templateUrl: 'login-dialog.component.html',
})
export class LoginDialogComponent {

    private username: string
    private password: string

    constructor(
        public dialogRef: MatDialogRef<LoginDialogComponent>,
        private loginService: LoginService) { }

    onSubmit(): void {
        this.dialogRef.close(this.loginService.loginUser(this.username, this.password));
    }

}