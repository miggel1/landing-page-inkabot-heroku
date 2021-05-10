import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.scss']
})

export class ComponentsComponent implements OnInit {
    page = 4;
    page1 = 5;
    focus;
    focus1;
    focus2;
    date: {year: number, month: number};
    model: NgbDateStruct;






    //constructor( private renderer : Renderer2) {}
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }
/*
    ngOnInit() {
        let input_group_focus = document.getElementsByClassName('form-control');
        let input_group = document.getElementsByClassName('input-group');
        for (let i = 0; i < input_group.length; i++) {
            input_group[i].children[0].addEventListener('focus', function (){
                input_group[i].classList.add('input-group-focus');
            });
            input_group[i].children[0].addEventListener('blur', function (){
                input_group[i].classList.remove('input-group-focus');
            });
        }
    }
    */

    form: FormGroup;
    name: FormControl = new FormControl("", [Validators.required]);
    email: FormControl = new FormControl("", [Validators.required, Validators.email]);
    message: FormControl = new FormControl("", [Validators.maxLength(256)]);
    honeypot: FormControl = new FormControl(""); // we will use this to prevent spam
    phone: FormControl = new FormControl("", [Validators.required]);
    empresa: FormControl = new FormControl("");
    submitted: boolean = false; // show and hide the success message
    isLoading: boolean = false; // disable the submit button if we're loading
    responseMessage: string; // the response message to show to the user
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: this.message,
      honeypot: this.honeypot,
      phone: this.phone,
      empresa: this.empresa
    });
  }

  
    ngOnInit(): void {
    }

    onSubmit() {
        if (this.form.status == "VALID" && this.honeypot.value == "") {
            this.form.disable(); // disable the form if it's valid to disable multiple submissions
            var formData: any = new FormData();
            formData.append("name", this.form.get("name").value);
            formData.append("email", this.form.get("email").value);
            formData.append("message", this.form.get("message").value);
            formData.append("phone", this.form.get("phone").value);
            formData.append("empresa", this.form.get("empresa").value);
            this.isLoading = true; // sending the post request async so it's in progress
            this.submitted = false; // hide the response message on multiple submits
            
            this.http.post("https://script.google.com/macros/s/AKfycbz7xXdK1-WX-0uKAFHZxCJlC0FQN2_dftmNOrkpQG_fAtz2bRnE1HFowb4yGmuIyQWsRQ/exec", formData).subscribe(
            (response) => {
                // choose the response message
                if (response["result"] == "success") {
                this.responseMessage = "Gracias por el mensaje! Te responderemos pronto.";
                } else {
                this.responseMessage = "Ups! Algo salio mal... Vuelva a cargar la pagina e intentelo de nuevo.";
                }
                this.form.enable(); // re enable the form after a success
                this.submitted = true; // show the response message
                this.isLoading = false; // re enable the submit button
                console.log(response);
            },
            (error) => {
                this.responseMessage = "Ups! Error... Vuelva a cargar la página e intentelo de nuevo.";
                this.form.enable(); // re enable the form after a success
                this.submitted = true; // show the response message
                this.isLoading = false; // re enable the submit button
                console.log(error);
            }
            );
        }
    }


    
}


