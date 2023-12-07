import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthenticationService } from 'app/auth/service';
import { CoreConfigService } from '@core/services/config.service';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { Rol } from 'app/auth/models/rol.model';
import { Recurso } from 'app/auth/models/recurso.model';
import { CoreMenu } from '@core/types';

@Component({
  selector: 'app-auth-login-v2',
  templateUrl: './auth-login-v2.component.html',
  styleUrls: ['./auth-login-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV2Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;
  menu: any;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _coreMenuService: CoreMenuService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this._authenticationService.currentUserValue) {
      this._router.navigate(['/']);
    }

    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Login
    this.loading = true;
    this._authenticationService
      .login(this.f.usuario.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.accesoConcedido==true){
            this.obtenerMenu();
            this._router.navigate([this.returnUrl]);
          }else{
            this.error = data.observacion;
            this.loading = false;
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
      
  }
  obtenerMenu(){
    this._authenticationService.obtenerMenu().subscribe(
      data=>{
    let menuArmar:Rol[]=JSON.parse(localStorage.getItem('menuJson'));
   if(menuArmar!=null){
    this.menu=this.obtenerRoles(menuArmar);
   }else{
     this.menu=null;
   }
    
   
    //this.menu = menu;
    this._coreMenuService.unregister('main');
    // Register the menu to the menu service
    this._coreMenuService.register('main', this.menu);

    // Set the main menu as our current menu
    this._coreMenuService.setCurrentMenu('main');
      }
    );
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  obtenerRoles(roles:Rol[]):CoreMenu[]{
    var menuItem:CoreMenu[]=[]; 
  roles.forEach(rol => {
    var item:CoreMenu=
       {
        id: rol.codigo.toString(),
        type: 'section',
        title: rol.nombre, 
       };
       if (rol.menu.length>0) {
         item.children=this.obtenerRecursos(rol.menu);
       } else {
         
       }
       menuItem.push(item);
  });
  return menuItem;
  }
  obtenerRecursos(recursos:Recurso[]) : CoreMenu[]{
    var menuProceso:CoreMenu[]=[]; 
    recursos.forEach(hijo => {
       var item:CoreMenu=
       {
        id: hijo.codigo.toString(),
        type: 'collapsible',
        title: hijo.nombre,
        icon: 'file-text',
       };
       if (hijo.recursosHijos.length>0) {
        item.children= this.obtenerRecursos(hijo.recursosHijos);
       } else {
        item.type='item';
        item.url=hijo.url;
        item.icon='circle';
       }
       menuProceso.push(item);
     });
     return menuProceso;
  }
  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      usuario: [null, Validators.required],
      password: [null, Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    
    

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
