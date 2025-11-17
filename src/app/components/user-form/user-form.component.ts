import { Component, Input, OnChanges, OnInit, SimpleChanges, EventEmitter, Output, ElementRef } from '@angular/core';
import { GenresListResponse } from '../../types/genre-list-response';
import { BrazilianStatesListResponse } from '../../types/brazilian-states-list-response';
import { IUser } from '../../interfaces/user/user.interface';
import { getPasswordStrengthValue } from '../../utils/get-password-strength-value';
import { convertPtBrDateToDateObj } from '../../utils/convert-pt-br-date-to-date-obj';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { convertDateObjToPtBrDate } from '../../utils/convert.date.obj.to.pt.br.date';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnChanges, OnInit {
  @Input() genresList: GenresListResponse = [];
  @Input() brazilianStatesList: BrazilianStatesListResponse = [];
  @Input() userSelected: IUser = {} as IUser;

  @Output('onFormSubmit') onFormSubmitEmitt = new EventEmitter<void>();

  constructor(
    private readonly _el: ElementRef
  ){}
  
  passwordStrengthValue = 0;
  minDate: Date | null = null;
  maxDate: Date | null = null;
  dateValue: Date | null = null;

  displayedColumns: string[] = ['title', 'band', 'genre', 'favorite'];
  filteredGenresList: GenresListResponse = [];

  ngOnInit(): void {
    this.setMinAndMaxDate();
  }
  ngOnChanges(changes: SimpleChanges) {
    const USER_CHANGED = changes['userSelected'];
    if (USER_CHANGED) {
      this.onPasswordChange(this.userSelected.password);
      this.setBirthDateToDatepicker(this.userSelected.birthDate);
      this.filteredGenresList = this.genresList;
    }
  }

  onPasswordChange(password: string) {
    this.passwordStrengthValue = getPasswordStrengthValue(password);
  }

  onDateChanged(event: MatDatepickerInputEvent<any, any>) {
    if (!event.value) {
      return;
    }

    this.userSelected.birthDate = convertDateObjToPtBrDate(event.value);
  }

  displayFn(genreId: number) {
    const genreFound = this.genresList.find(genre => genre.id === genreId);

    return genreFound ? genreFound.description : '';
  }

  filterGenres(text: string) {
    if (typeof text == "number") return;
    const searchTerm = text.toLocaleLowerCase();

    this.filteredGenresList = this.genresList.filter(
      genres => genres.description.toLocaleLowerCase().includes(searchTerm)
    );
  }

  isAnyCheckBoxChecked(): boolean {
    return this.userSelected.musics.some(music => music.isFavorite === true);
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      this.focusOnInvalidControl(form);

      return;
    }
    this.onFormSubmitEmitt.emit();
  }

  focusOnInvalidControl(form: NgForm) { 
    for(const control of Object.keys(form.controls)){
      if(form.controls[control].invalid){
          const invalidControl: HTMLElement = this._el.nativeElement.querySelector(`[name=${control}]`);

          invalidControl.focus();

          break;
      }
    }
  }

  private setMinAndMaxDate() {
    this.minDate = new Date(new Date().getFullYear() - 100, 0, 1);
    this.maxDate = new Date();
  }

  private setBirthDateToDatepicker(birthDate: string) {
    this.dateValue = convertPtBrDateToDateObj(birthDate);
  }
}
