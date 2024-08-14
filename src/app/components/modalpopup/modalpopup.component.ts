import { Component, Output, EventEmitter, Renderer2, ElementRef, AfterViewInit } from '@angular/core';

interface FormEntry {
  name: string;
  phone: string;
  email: string;
  companyName: string;
  links: string;
  taskDescription: string;
  services: string[];
  countryCode: string;
}

interface Country {
  name: string;
  dialCode: string;
}

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.scss']
})
export class ModalpopupComponent implements AfterViewInit {
  @Output() closeModal = new EventEmitter<void>();

  formData = {
    name: '',
    phone: '',
    email: '',
    companyName: '',
    links: '',
    taskDescription: '',
    countryCode: '+380'
  };

  countries: Country[] = [
    { name: 'Украина', dialCode: '+380' },
    { name: 'Польша', dialCode: '+48' },
    { name: 'США', dialCode: '+1' },
  ];

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

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const wrapper = this.elRef.nativeElement.querySelector('.wrapper--popup');
      this.renderer.addClass(wrapper, 'fade-in');
      const popupMain = this.elRef.nativeElement.querySelector('.popup--main');
      this.renderer.addClass(popupMain, 'fade-in');
    }, 0);
  }

  isFormValid(): boolean {
    const allFieldsFilled = Object.values(this.formData).every(field => field.trim() !== '');
    const atLeastOneServiceSelected = this.services.some(service => service.selected);

    return allFieldsFilled && atLeastOneServiceSelected;
  }

  onSubmit() {
    if (this.isFormValid()) {
      const selectedServices = this.services.filter(service => service.selected).map(service => service.name);
      const formDataWithServices = {
        ...this.formData,
        services: selectedServices
      };
      this.submittedData.push(formDataWithServices);
      console.log('Submitted data:', formDataWithServices);
      this.closeModal.emit();
    } else {
      console.log('Пожалуйста, заполните все поля и выберите хотя бы одну услугу.');
    }
  }

  onCountryChange(event: Event) {
    const selectedDialCode = (event.target as HTMLSelectElement).value;
    this.formData.phone = `${selectedDialCode}`;
  }

  onFieldClick() {
    this.closeModal.emit();
  }
}
