import { Component, Output, EventEmitter } from '@angular/core';


interface FormEntry {
  name: string;
  phone: string;
  email: string;
  companyName: string;
  links: string;
  taskDescription: string;
  services: string[];
}

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.scss']
})
export class ModalpopupComponent {
  @Output() closeModal = new EventEmitter<void>();

  formData = {
    name: '',
    phone: '',
    email: '',
    companyName: '',
    links: '',
    taskDescription: ''
  };

  services = [
    { name: 'Розробити HR-стратегію', selected: false },
    { name: 'Розробити стратегію рекрутингу', selected: false },
    { name: 'Розробити стратегію інтранету', selected: false },
    { name: 'Розробити SMM-стратегію', selected: false },
    { name: 'Ведення та розвиток кар\'єрних спільнот бренду в соціальних мережах', selected: false },
    { name: 'Робота з репутацією в інтернеті', selected: false },
    { name: 'Створити кар\'єрний лендінг', selected: false },
    { name: 'Лідогенерація на закриття вакансій', selected: false },
    { name: 'Охоплення цільової аудиторії в інтернеті', selected: false },
  ];

  submittedData: FormEntry[] = [];

  isFormValid(): boolean {
    const allFieldsFilled = Object.values(this.formData).every(field => field.trim() !== '');
    const atLeastOneServiceSelected = this.services.some(service => service.selected);

    return allFieldsFilled && atLeastOneServiceSelected;
  }

  onSubmit() {
    if (this.isFormValid()) {
      const selectedServices = this.services.filter(service => service.selected).map(service => service.name);
      const newEntry: FormEntry = {
        ...this.formData,
        services: selectedServices
      };
      this.submittedData.push(newEntry);
      this.closeModal.emit();
      console.log(this.submittedData);
    } else {
      console.log('Пожалуйста, заполните все поля и выберите хотя бы одну услугу.');
    }
  }

  onFieldClick() {
    this.closeModal.emit();
  }
}
