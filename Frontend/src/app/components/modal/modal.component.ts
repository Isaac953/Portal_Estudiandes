import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { faXmark, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  modalSwitch: any;
  faXmark = faXmark;
  modalData: any;
  modalTitle: any;
  idAsignature: any;
  responseApi: any;
  activitiesT: any;
  nameC: any;
  idContent: any;
  contents: any;
  sendContent: any;
  messageData: any;
  typeCrud: any;
  dataUpdate: any;
  faPlay = faPlay;
  typeActivity: any;

  idAsignatureV = this._route.snapshot.paramMap.get('idAsignature');

  contentForm = new FormGroup({
    asignatura: new FormControl(''),
    titulo: new FormControl(''),
    tipo_contenido: new FormControl(''),
    contenido: new FormControl(''),
  });

  constructor(private modalService: ModalService, private _route: ActivatedRoute, private loadAsignature: GetDataService, private router: Router) { }

  closeModal = () => {
    this.modalSwitch = 'disabled';
    this.typeCrud = '';
    setTimeout(() => {
      this.modalService.modal$.emit(this.modalSwitch);
      this.clearValues();
    }, 200);
  };

  openContent = () => {

  }

  /* Crud Actions */
  onSubmit() {
    // console.warn(this.contentForm.value);
    if (this.typeCrud == "Insertar") {
      this.loadAsignature.insertContent(this.contentForm.value, this.idAsignature).subscribe((response) => {
        this.messageData = "Registro realizado con exito";

        console.log(response);

        setTimeout(() => {
          location.reload();
        }, 1000);
      })
    } else if (this.typeCrud == "Actualizar") {
      this.dataUpdate = {};
      // this.dataUpdate = this.contentForm.value;
      this.dataUpdate.pk = this.idContent;
      this.dataUpdate.asignatura = this.contentForm.controls.asignatura.value;
      this.dataUpdate.titulo = this.contentForm.controls.titulo.value;
      this.dataUpdate.tipo_contenido = this.contentForm.controls.tipo_contenido.value;
      this.dataUpdate.contenido = this.contentForm.controls.contenido.value;
      console.log(this.dataUpdate);

      this.loadAsignature.updateContent(this.dataUpdate, this.idContent).subscribe((response) => {
        this.messageData = "Registro actualizado con exito";

        console.log(response);

        setTimeout(() => {
          location.reload();
        }, 1000);
      })
    }else if (this.typeCrud == "Eliminar") {
      this.dataUpdate = {};
      // this.dataUpdate = this.contentForm.value;
      this.dataUpdate.pk = this.idContent;
      // this.dataUpdate.asignatura = this.contentForm.controls.asignatura.value;
      // this.dataUpdate.titulo = this.contentForm.controls.titulo.value;
      // this.dataUpdate.tipo_contenido = this.contentForm.controls.tipo_contenido.value;
      // this.dataUpdate.contenido = this.contentForm.controls.contenido.value;
      console.log(this.dataUpdate);

      this.loadAsignature.deleteContent(this.dataUpdate, this.idContent).subscribe((response) => {
        this.messageData = "Registro eliminado";

        console.log(response);

        setTimeout(() => {
          location.reload();
        }, 1000);
      })
    }

  }

  setId() {
    this.contentForm.setValue(
      {
        asignatura: this.idAsignature,
        titulo: '',
        tipo_contenido: '',
        contenido: ''
      },
    );
  }

  setValue() {
    this.contentForm.setValue(
      {
        asignatura: this.idAsignature,
        titulo: this.modalData.titulo,
        tipo_contenido: this.modalData.tipo_contenido,
        contenido: this.modalData.contenido
      },
    );
  }

  clearValues() {
    this.contentForm.setValue(
      {
        asignatura: this.idAsignature,
        titulo: '',
        tipo_contenido: '',
        contenido: ''
      },
    );
  }

  ngOnInit() {
    this.modalData = [];

    this.modalService.modal$.subscribe((modalValue) => {
      setTimeout(() => {
        this.modalSwitch = modalValue;
      }, 200);
    });

    this.modalService.modalData$.subscribe((infoModal) => {
      this.modalData = infoModal;
      console.log(this.modalData);
      this.setValue();
    });


    this.modalService.modalTitle$.subscribe((title) => {
      this.modalTitle = title;
    });

    this.modalService.idAsignature$.subscribe((id) => {
      this.idAsignature = id;
      this.setId();
      // return this.idAsignature;
    })

    this.modalService.activities$.subscribe((list) => {
      this.activitiesT = list;
    })

    this.modalService.typeActivity$.subscribe((description) => {
      this.typeActivity = description;
    })

    this.modalService.modalType$.subscribe((namec) => {
      this.nameC = namec;
    })

    this.modalService.idContent$.subscribe((idContent) => {
      this.idContent = idContent;
      return this.idContent;
    })

    this.modalService.typeCrud$.subscribe((crud) => {
      this.typeCrud = crud;
    })

    // this.idAsignature = this._route.snapshot.paramMap.get('idAsignature')


  }

  AfterViewInit() {

  }
}