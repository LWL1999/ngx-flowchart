import { Component, ComponentFactoryResolver, Directive, ElementRef, HostBinding, HostListener, Inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FC_NODE_COMPONENT_CONFIG, FlowchartConstants } from './ngx-flowchart.models';
import { FcModelService } from './model.service';
import * as i0 from "@angular/core";
export class FcNodeContainerComponent {
    constructor(nodeComponentConfig, elementRef, componentFactoryResolver) {
        this.nodeComponentConfig = nodeComponentConfig;
        this.elementRef = elementRef;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    get nodeId() {
        return this.node.id;
    }
    get top() {
        return this.node.y + 'px';
    }
    get left() {
        return this.node.x + 'px';
    }
    ngOnInit() {
        if (!this.userNodeCallbacks) {
            this.userNodeCallbacks = {};
        }
        this.userNodeCallbacks.nodeEdit = this.userNodeCallbacks.nodeEdit || (() => { });
        this.userNodeCallbacks.doubleClick = this.userNodeCallbacks.doubleClick || (() => { });
        this.userNodeCallbacks.mouseDown = this.userNodeCallbacks.mouseDown || (() => { });
        this.userNodeCallbacks.mouseEnter = this.userNodeCallbacks.mouseEnter || (() => { });
        this.userNodeCallbacks.mouseLeave = this.userNodeCallbacks.mouseLeave || (() => { });
        const element = $(this.elementRef.nativeElement);
        element.addClass(FlowchartConstants.nodeClass);
        if (!this.node.readonly) {
            element.attr('draggable', 'true');
        }
        this.updateNodeClass();
        this.modelservice.nodes.setHtmlElement(this.node.id, element[0]);
        this.nodeContentContainer.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.nodeComponentConfig.nodeComponentType);
        const componentRef = this.nodeContentContainer.createComponent(componentFactory);
        this.nodeComponent = componentRef.instance;
        this.nodeComponent.callbacks = this.callbacks;
        this.nodeComponent.userNodeCallbacks = this.userNodeCallbacks;
        this.nodeComponent.node = this.node;
        this.nodeComponent.modelservice = this.modelservice;
        this.updateNodeComponent();
        this.nodeComponent.width = this.elementRef.nativeElement.offsetWidth;
        this.nodeComponent.height = this.elementRef.nativeElement.offsetHeight;
    }
    ngAfterViewInit() {
        this.nodeComponent.width = this.elementRef.nativeElement.offsetWidth;
        this.nodeComponent.height = this.elementRef.nativeElement.offsetHeight;
    }
    ngOnChanges(changes) {
        let updateNode = false;
        for (const propName of Object.keys(changes)) {
            const change = changes[propName];
            if (!change.firstChange && change.currentValue !== change.previousValue) {
                if (['selected', 'edit', 'underMouse', 'mouseOverConnector', 'dragging'].includes(propName)) {
                    updateNode = true;
                }
            }
        }
        if (updateNode) {
            this.updateNodeClass();
            this.updateNodeComponent();
        }
    }
    updateNodeClass() {
        const element = $(this.elementRef.nativeElement);
        this.toggleClass(element, FlowchartConstants.selectedClass, this.selected);
        this.toggleClass(element, FlowchartConstants.editClass, this.edit);
        this.toggleClass(element, FlowchartConstants.hoverClass, this.underMouse);
        this.toggleClass(element, FlowchartConstants.draggingClass, this.dragging);
    }
    updateNodeComponent() {
        this.nodeComponent.selected = this.selected;
        this.nodeComponent.edit = this.edit;
        this.nodeComponent.underMouse = this.underMouse;
        this.nodeComponent.mouseOverConnector = this.mouseOverConnector;
        this.nodeComponent.dragging = this.dragging;
    }
    toggleClass(element, clazz, set) {
        if (set) {
            element.addClass(clazz);
        }
        else {
            element.removeClass(clazz);
        }
    }
    mousedown(event) {
        event.stopPropagation();
    }
    dragstart(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragstart(event, this.node);
        }
    }
    dragend(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeDragend(event);
        }
    }
    click(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeClicked(event, this.node);
        }
    }
    mouseover(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOver(event, this.node);
        }
    }
    mouseout(event) {
        if (!this.node.readonly) {
            this.callbacks.nodeMouseOut(event, this.node);
        }
    }
}
FcNodeContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.14", ngImport: i0, type: FcNodeContainerComponent, deps: [{ token: FC_NODE_COMPONENT_CONFIG }, { token: i0.ElementRef }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Component });
FcNodeContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.14", type: FcNodeContainerComponent, selector: "fc-node", inputs: { callbacks: "callbacks", userNodeCallbacks: "userNodeCallbacks", node: "node", selected: "selected", edit: "edit", underMouse: "underMouse", mouseOverConnector: "mouseOverConnector", modelservice: "modelservice", dragging: "dragging" }, host: { listeners: { "mousedown": "mousedown($event)", "dragstart": "dragstart($event)", "dragend": "dragend($event)", "click": "click($event)", "mouseover": "mouseover($event)", "mouseout": "mouseout($event)" }, properties: { "attr.id": "this.nodeId", "style.top": "this.top", "style.left": "this.left" } }, viewQueries: [{ propertyName: "nodeContentContainer", first: true, predicate: ["nodeContent"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: '<ng-template #nodeContent></ng-template>', isInline: true, styles: [":host{position:absolute;z-index:1}:host.fc-dragging{z-index:10}:host ::ng-deep .fc-leftConnectors,:host ::ng-deep .fc-rightConnectors{position:absolute;top:0;height:100%;display:flex;flex-direction:column;z-index:-10}:host ::ng-deep .fc-leftConnectors .fc-magnet,:host ::ng-deep .fc-rightConnectors .fc-magnet{align-items:center}:host ::ng-deep .fc-leftConnectors{left:-20px}:host ::ng-deep .fc-rightConnectors{right:-20px}:host ::ng-deep .fc-magnet{display:flex;flex-grow:1;height:60px;justify-content:center}:host ::ng-deep .fc-connector{width:18px;height:18px;border:10px solid transparent;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box;border-radius:50%;background-color:#f7a789;color:#fff;pointer-events:all}:host ::ng-deep .fc-connector.fc-hover{background-color:#000}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.14", ngImport: i0, type: FcNodeContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'fc-node',
                    template: '<ng-template #nodeContent></ng-template>',
                    styleUrls: ['./node.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [FC_NODE_COMPONENT_CONFIG]
                }] }, { type: i0.ElementRef }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { callbacks: [{
                type: Input
            }], userNodeCallbacks: [{
                type: Input
            }], node: [{
                type: Input
            }], selected: [{
                type: Input
            }], edit: [{
                type: Input
            }], underMouse: [{
                type: Input
            }], mouseOverConnector: [{
                type: Input
            }], modelservice: [{
                type: Input
            }], dragging: [{
                type: Input
            }], nodeId: [{
                type: HostBinding,
                args: ['attr.id']
            }], top: [{
                type: HostBinding,
                args: ['style.top']
            }], left: [{
                type: HostBinding,
                args: ['style.left']
            }], nodeContentContainer: [{
                type: ViewChild,
                args: ['nodeContent', { read: ViewContainerRef, static: true }]
            }], mousedown: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }], dragstart: [{
                type: HostListener,
                args: ['dragstart', ['$event']]
            }], dragend: [{
                type: HostListener,
                args: ['dragend', ['$event']]
            }], click: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], mouseover: [{
                type: HostListener,
                args: ['mouseover', ['$event']]
            }], mouseout: [{
                type: HostListener,
                args: ['mouseout', ['$event']]
            }] } });
// tslint:disable-next-line:directive-class-suffix
export class FcNodeComponent {
    constructor() {
        this.flowchartConstants = FlowchartConstants;
        this.nodeRectInfo = {
            top: () => {
                return this.node.y;
            },
            left: () => {
                return this.node.x;
            },
            bottom: () => {
                return this.node.y + this.height;
            },
            right: () => {
                return this.node.x + this.width;
            },
            width: () => {
                return this.width;
            },
            height: () => {
                return this.height;
            }
        };
    }
    ngOnInit() {
    }
}
FcNodeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.14", ngImport: i0, type: FcNodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
FcNodeComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.14", type: FcNodeComponent, inputs: { callbacks: "callbacks", userNodeCallbacks: "userNodeCallbacks", node: "node", selected: "selected", edit: "edit", underMouse: "underMouse", mouseOverConnector: "mouseOverConnector", modelservice: "modelservice", dragging: "dragging" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.14", ngImport: i0, type: FcNodeComponent, decorators: [{
            type: Directive
        }], propDecorators: { callbacks: [{
                type: Input
            }], userNodeCallbacks: [{
                type: Input
            }], node: [{
                type: Input
            }], selected: [{
                type: Input
            }], edit: [{
                type: Input
            }], underMouse: [{
                type: Input
            }], mouseOverConnector: [{
                type: Input
            }], modelservice: [{
                type: Input
            }], dragging: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZmxvd2NoYXJ0L3NyYy9saWIvbm9kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBSUwsU0FBUyxFQUNULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsd0JBQXdCLEVBTXhCLGtCQUFrQixFQUVuQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFPakQsTUFBTSxPQUFPLHdCQUF3QjtJQWdEbkMsWUFBc0QsbUJBQTBDLEVBQzVFLFVBQW1DLEVBQ25DLHdCQUFrRDtRQUZoQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXVCO1FBQzVFLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7SUFDdEUsQ0FBQztJQXRCRCxJQUNJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUNJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFDSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQVdELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7U0FDN0I7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMs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QUM7U0FDRixDQUFDO0tBS0g7SUFIQyxRQUFRO0lBQ1IsQ0FBQzs7NkdBOURtQixlQUFlO2lHQUFmLGVBQWU7NEZBQWYsZUFBZTtrQkFGcEMsU0FBUzs4QkFLUixTQUFTO3NCQURSLEtBQUs7Z0JBSU4saUJBQWlCO3NCQURoQixLQUFLO2dCQUlOLElBQUk7c0JBREgsS0FBSztnQkFJTixRQUFRO3NCQURQLEtBQUs7Z0JBSU4sSUFBSTtzQkFESCxLQUFLO2dCQUlOLFVBQVU7c0JBRFQsS0FBSztnQkFJTixrQkFBa0I7c0JBRGpCLEtBQUs7Z0JBSU4sWUFBWTtzQkFEWCxLQUFLO2dCQUlOLFFBQVE7c0JBRFAsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBGQ19OT0RFX0NPTVBPTkVOVF9DT05GSUcsXG4gIEZjQ2FsbGJhY2tzLFxuICBGY0Nvbm5lY3RvcixcbiAgRmNOb2RlLFxuICBGY05vZGVDb21wb25lbnRDb25maWcsXG4gIEZjTm9kZVJlY3RJbmZvLFxuICBGbG93Y2hhcnRDb25zdGFudHMsXG4gIFVzZXJOb2RlQ2FsbGJhY2tzXG59IGZyb20gJy4vbmd4LWZsb3djaGFydC5tb2RlbHMnO1xuaW1wb3J0IHsgRmNNb2RlbFNlcnZpY2UgfSBmcm9tICcuL21vZGVsLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmYy1ub2RlJyxcbiAgdGVtcGxhdGU6ICc8bmctdGVtcGxhdGUgI25vZGVDb250ZW50PjwvbmctdGVtcGxhdGU+JyxcbiAgc3R5bGVVcmxzOiBbJy4vbm9kZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZjTm9kZUNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKVxuICBjYWxsYmFja3M6IEZjQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIHVzZXJOb2RlQ2FsbGJhY2tzOiBVc2VyTm9kZUNhbGxiYWNrcztcblxuICBASW5wdXQoKVxuICBub2RlOiBGY05vZGU7XG5cbiAgQElucHV0KClcbiAgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZWRpdDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICB1bmRlck1vdXNlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIG1vdXNlT3ZlckNvbm5lY3RvcjogRmNDb25uZWN0b3I7XG5cbiAgQElucHV0KClcbiAgbW9kZWxzZXJ2aWNlOiBGY01vZGVsU2VydmljZTtcblxuICBASW5wdXQoKVxuICBkcmFnZ2luZzogYm9vbGVhbjtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuaWQnKVxuICBnZXQgbm9kZUlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5pZDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUudG9wJylcbiAgZ2V0IHRvcCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5vZGUueSArICdweCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmxlZnQnKVxuICBnZXQgbGVmdCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5vZGUueCArICdweCc7XG4gIH1cblxuICBub2RlQ29tcG9uZW50OiBGY05vZGVDb21wb25lbnQ7XG5cbiAgQFZpZXdDaGlsZCgnbm9kZUNvbnRlbnQnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlfSkgbm9kZUNvbnRlbnRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChGQ19OT0RFX0NPTVBPTkVOVF9DT05GSUcpIHByaXZhdGUgbm9kZUNvbXBvbmVudENvbmZpZzogRmNOb2RlQ29tcG9uZW50Q29uZmlnLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudXNlck5vZGVDYWxsYmFja3MpIHtcbiAgICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MgPSB7fTtcbiAgICB9XG4gICAgdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5ub2RlRWRpdCA9IHRoaXMudXNlck5vZGVDYWxsYmFja3Mubm9kZUVkaXQgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLmRvdWJsZUNsaWNrID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5kb3VibGVDbGljayB8fCAoKCkgPT4ge30pO1xuICAgIHRoaXMudXNlck5vZGVDYWxsYmFja3MubW91c2VEb3duID0gdGhpcy51c2VyTm9kZUNhbGxiYWNrcy5tb3VzZURvd24gfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlRW50ZXIgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlRW50ZXIgfHwgKCgpID0+IHt9KTtcbiAgICB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlTGVhdmUgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzLm1vdXNlTGVhdmUgfHwgKCgpID0+IHt9KTtcblxuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICBlbGVtZW50LmFkZENsYXNzKEZsb3djaGFydENvbnN0YW50cy5ub2RlQ2xhc3MpO1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICBlbGVtZW50LmF0dHIoJ2RyYWdnYWJsZScsICd0cnVlJyk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlTm9kZUNsYXNzKCk7XG4gICAgdGhpcy5tb2RlbHNlcnZpY2Uubm9kZXMuc2V0SHRtbEVsZW1lbnQodGhpcy5ub2RlLmlkLCBlbGVtZW50WzBdKTtcbiAgICB0aGlzLm5vZGVDb250ZW50Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMubm9kZUNvbXBvbmVudENvbmZpZy5ub2RlQ29tcG9uZW50VHlwZSk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5ub2RlQ29udGVudENvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgdGhpcy5ub2RlQ29tcG9uZW50ID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5jYWxsYmFja3MgPSB0aGlzLmNhbGxiYWNrcztcbiAgICB0aGlzLm5vZGVDb21wb25lbnQudXNlck5vZGVDYWxsYmFja3MgPSB0aGlzLnVzZXJOb2RlQ2FsbGJhY2tzO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5ub2RlID0gdGhpcy5ub2RlO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5tb2RlbHNlcnZpY2UgPSB0aGlzLm1vZGVsc2VydmljZTtcbiAgICB0aGlzLnVwZGF0ZU5vZGVDb21wb25lbnQoKTtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQud2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuaGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC53aWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5oZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgbGV0IHVwZGF0ZU5vZGUgPSBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IHByb3BOYW1lIG9mIE9iamVjdC5rZXlzKGNoYW5nZXMpKSB7XG4gICAgICBjb25zdCBjaGFuZ2UgPSBjaGFuZ2VzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghY2hhbmdlLmZpcnN0Q2hhbmdlICYmIGNoYW5nZS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZS5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgIGlmIChbJ3NlbGVjdGVkJywgJ2VkaXQnLCAndW5kZXJNb3VzZScsICdtb3VzZU92ZXJDb25uZWN0b3InLCAnZHJhZ2dpbmcnXS5pbmNsdWRlcyhwcm9wTmFtZSkpIHtcbiAgICAgICAgICB1cGRhdGVOb2RlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodXBkYXRlTm9kZSkge1xuICAgICAgdGhpcy51cGRhdGVOb2RlQ2xhc3MoKTtcbiAgICAgIHRoaXMudXBkYXRlTm9kZUNvbXBvbmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTm9kZUNsYXNzKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKGVsZW1lbnQsIEZsb3djaGFydENvbnN0YW50cy5zZWxlY3RlZENsYXNzLCB0aGlzLnNlbGVjdGVkKTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKGVsZW1lbnQsIEZsb3djaGFydENvbnN0YW50cy5lZGl0Q2xhc3MsIHRoaXMuZWRpdCk7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhlbGVtZW50LCBGbG93Y2hhcnRDb25zdGFudHMuaG92ZXJDbGFzcywgdGhpcy51bmRlck1vdXNlKTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKGVsZW1lbnQsIEZsb3djaGFydENvbnN0YW50cy5kcmFnZ2luZ0NsYXNzLCB0aGlzLmRyYWdnaW5nKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTm9kZUNvbXBvbmVudCgpIHtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5lZGl0ID0gdGhpcy5lZGl0O1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC51bmRlck1vdXNlID0gdGhpcy51bmRlck1vdXNlO1xuICAgIHRoaXMubm9kZUNvbXBvbmVudC5tb3VzZU92ZXJDb25uZWN0b3IgPSB0aGlzLm1vdXNlT3ZlckNvbm5lY3RvcjtcbiAgICB0aGlzLm5vZGVDb21wb25lbnQuZHJhZ2dpbmcgPSB0aGlzLmRyYWdnaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVDbGFzcyhlbGVtZW50OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCBjbGF6ejogc3RyaW5nLCBzZXQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoc2V0KSB7XG4gICAgICBlbGVtZW50LmFkZENsYXNzKGNsYXp6KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhjbGF6eik7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnLCBbJyRldmVudCddKVxuICBkcmFnc3RhcnQoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVEcmFnc3RhcnQoZXZlbnQsIHRoaXMubm9kZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcsIFsnJGV2ZW50J10pXG4gIGRyYWdlbmQoZXZlbnQ6IEV2ZW50IHwgYW55KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVEcmFnZW5kKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm5vZGUucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLm5vZGVDbGlja2VkKGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFsnJGV2ZW50J10pXG4gIG1vdXNlb3ZlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5ub2RlLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5ub2RlTW91c2VPdmVyKGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3V0JywgWyckZXZlbnQnXSlcbiAgbW91c2VvdXQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMubm9kZS5yZWFkb25seSkge1xuICAgICAgdGhpcy5jYWxsYmFja3Mubm9kZU1vdXNlT3V0KGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfVxuXG59XG5cbkBEaXJlY3RpdmUoKVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGY05vZGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIGNhbGxiYWNrczogRmNDYWxsYmFja3M7XG5cbiAgQElucHV0KClcbiAgdXNlck5vZGVDYWxsYmFja3M6IFVzZXJOb2RlQ2FsbGJhY2tzO1xuXG4gIEBJbnB1dCgpXG4gIG5vZGU6IEZjTm9kZTtcblxuICBASW5wdXQoKVxuICBzZWxlY3RlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBlZGl0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHVuZGVyTW91c2U6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgbW91c2VPdmVyQ29ubmVjdG9yOiBGY0Nvbm5lY3RvcjtcblxuICBASW5wdXQoKVxuICBtb2RlbHNlcnZpY2U6IEZjTW9kZWxTZXJ2aWNlO1xuXG4gIEBJbnB1dCgpXG4gIGRyYWdnaW5nOiBib29sZWFuO1xuXG4gIGZsb3djaGFydENvbnN0YW50cyA9IEZsb3djaGFydENvbnN0YW50cztcblxuICB3aWR0aDogbnVtYmVyO1xuXG4gIGhlaWdodDogbnVtYmVyO1xuXG4gIG5vZGVSZWN0SW5mbzogRmNOb2RlUmVjdEluZm8gPSB7XG4gICAgdG9wOiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLnk7XG4gICAgfSxcblxuICAgIGxlZnQ6ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUueDtcbiAgICB9LFxuXG4gICAgYm90dG9tOiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLnkgKyB0aGlzLmhlaWdodDtcbiAgICB9LFxuXG4gICAgcmlnaHQ6ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUueCArIHRoaXMud2lkdGg7XG4gICAgfSxcblxuICAgIHdpZHRoOiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy53aWR0aDtcbiAgICB9LFxuXG4gICAgaGVpZ2h0OiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gICAgfVxuICB9O1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG5cbn1cbiJdfQ==