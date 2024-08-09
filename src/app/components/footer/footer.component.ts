import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onFieldClick() {
    this.closeModal();
  }

  isFormValid(): boolean {

    return true;
  }

  onSubmit() {
    if (this.isFormValid()) {

      console.log('Форма отправлена');
      this.closeModal();
    } else {
      console.log('Пожалуйста, заполните все поля и выберите хотя бы одну услугу.');
    }
  }
}
