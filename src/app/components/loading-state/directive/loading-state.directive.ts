import { AfterViewInit, ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoadingStateComponent } from '../view/loading-state.component';

@Directive({ selector: '[loadingState]' })
export class LoadingStateDirective implements AfterViewInit, OnDestroy {

    @Input()
    public set loadingState(isLoading: boolean) {
        this._loading = isLoading;
        if (this.loaderComponent) this.loaderComponent.instance.loading = isLoading;
    }
    public get loadingState(): boolean {
        return this._loading;
    }

    private _loading: boolean;
    private loaderComponent: ComponentRef<LoadingStateComponent>;

    constructor(
        private target: ViewContainerRef,
        private template: TemplateRef<any>,
        private componentFactoryResolver: ComponentFactoryResolver,
        private cdr: ChangeDetectorRef,
    ) { }

    ngAfterViewInit(): void {
        this.createComponent();
    }

    ngOnDestroy(): void {
        if (this.loaderComponent) {
            this.loaderComponent.destroy();
        }
    }

    private createComponent(): void {
        const factory = this.componentFactoryResolver.resolveComponentFactory(LoadingStateComponent);
        this.loaderComponent = this.target.createComponent(factory);
        this.loaderComponent.instance.contents = this.template;
        this.loaderComponent.instance.loading = this.loadingState;
        this.cdr.detectChanges();
    }


}