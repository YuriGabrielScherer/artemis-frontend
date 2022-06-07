import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';

@Component({
    selector: 'loading-state',
    templateUrl: 'loading-state.component.html',
    styleUrls: ['./loading-state.component.scss'],
})
export class LoadingStateComponent implements OnDestroy {

    public static nextId = 0;

    @Input()
    public id = `loading-state-${LoadingStateComponent.nextId++}`;

    @Input()
    public blockWindow: boolean = false;

    @Input()
    public set loading(loading: boolean) {
        this._loading = loading;
        if (loading) {
            this.block();
        } else {
            this.unblock();
        }
    }
    public get loading(): boolean {
        return this._loading;
    }

    public contents: TemplateRef<any>;
    public blocking: boolean = false;

    private _loading: boolean;
    private readonly BLOCK_TIMEOUT_VALUE = 300;
    private readonly UNBLOCK_TIMEOUT_VALUE = 200;
    private blockTimeoutId?: any;
    private unblockTimeoutId?: any;

    ngOnDestroy(): void {
        if (this.blockTimeoutId) {
            clearTimeout(this.blockTimeoutId);
        }

        if (this.unblockTimeoutId) {
            clearTimeout(this.unblockTimeoutId);
        }
    }

    public block(): void {

        if (this.unblockTimeoutId) {
            clearTimeout(this.unblockTimeoutId);
            this.unblockTimeoutId = undefined;
        }

        if (!this.blockTimeoutId) {
            this.blockTimeoutId = setTimeout(() => {
                this.blocking = true;
                this.blockTimeoutId = undefined;
            }, this.BLOCK_TIMEOUT_VALUE);
        }
    }

    public unblock(): void {
        if (this.blockTimeoutId) {
            clearTimeout(this.blockTimeoutId);
            this.blockTimeoutId = undefined;
        }

        if (!this.unblockTimeoutId) {
            this.unblockTimeoutId = setTimeout(() => {
                this.blocking = false;
                this.unblockTimeoutId = undefined;
            }, this.UNBLOCK_TIMEOUT_VALUE);
        }
    }

}