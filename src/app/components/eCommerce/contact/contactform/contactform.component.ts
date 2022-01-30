import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {
  contactForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      'contact-name': new FormControl(null, [Validators.required]),
      'contact-email': new FormControl(null, [Validators.required, Validators.email]),
      'contact-message': new FormControl(null, [Validators.required])
    });

  }
  onSubmit() {
    this.contactForm.reset();
  }

}
