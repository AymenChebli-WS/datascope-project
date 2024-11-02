import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

@Component({
  selector: 'app-importoffer',
  templateUrl: './importoffer.component.html',
  styleUrls: ['./importoffer.component.css']
})
export class ImportofferComponent {
  responseMessage: any;
  extractedText: string = '';
  user: any;
  userEmail: any;
  loading: boolean = false;

  constructor(private router: Router, private offerService: OfferService, private userService: UserService ,private snackbarService: SnackbarService, private dialogRef: MatDialogRef<ImportofferComponent>) {}

  // Trigger file input click
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileReader = new FileReader();
  
      fileReader.onload = (e) => {
        const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
        this.extractTextFromPDF(typedArray);
      };
  
      fileReader.readAsArrayBuffer(file);
    }
  }
  
  extractTextFromPDF(typedArray: Uint8Array) {
    this.loading = true;
    pdfjsLib.getDocument(typedArray).promise.then((pdf: any) => {
      const maxPages = pdf.numPages;
      let extractedText = '';
  
      for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
        pdf.getPage(pageNumber).then((page: any) => {
          page.getTextContent().then((textContent: any) => {
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            extractedText += pageText + '\n';
            console.log('Extracted text from page', pageNumber, ':\n', pageText);
            //Send to Back for AI Procession
            var data = pageText;
            this.offerService.generateData(data).subscribe((response: any) => {
              console.log('Generated Data:', response);
              this.loading = false;
              this.dialogRef.close();
              this.checkIfAdmin();
              window.location.reload();
            }, (error) => {
              if(error.error?.message){
                this.loading = false;
                this.responseMessage = error.error?.message;
              }
              else {
                this.loading = false;
                this.responseMessage = "Not getting a response."
              }
              this.snackbarService.openSnackBar(this.responseMessage, '')
            })
          });
        });
      }
    }).catch((error: any) => {
      this.loading = false;
      console.error('Error extracting text from PDF:', error);
    });
  }
  

  onSubmit() {
    var data = "How up to date is your database?"
    this.offerService.generateData(data).subscribe((response: any) => {
      console.log('Generated Data:', response);
    }, (error) => {
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = "Not getting a response."
      }
      this.snackbarService.openSnackBar(this.responseMessage, '')
    })
  }

  checkIfAdmin() {
    this.userEmail = this.userService.getUserEmailFromToken();
      this.userService.getUserInfo(this.userEmail).subscribe(
        (data: User) => {
          this.user = data;
          if(this.user.role == "ADMIN") {
            this.router.navigate(['/back/offer-list']);
          } else {
            this.router.navigate(['/offer-list']);
          }
          console.log('User data retrieved:', this.user);
        },
        (error) => {
          console.error('Error retrieving user:', error);
        }
        );
  }
}
