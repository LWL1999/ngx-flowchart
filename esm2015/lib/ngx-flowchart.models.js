import { InjectionToken } from '@angular/core';
export const FC_NODE_COMPONENT_CONFIG = new InjectionToken('fc-node.component.config');
const htmlPrefix = 'fc';
const leftConnectorType = 'leftConnector';
const rightConnectorType = 'rightConnector';
export const FlowchartConstants = {
    htmlPrefix,
    leftConnectorType,
    rightConnectorType,
    curvedStyle: 'curved',
    lineStyle: 'line',
    dragAnimationRepaint: 'repaint',
    dragAnimationShadow: 'shadow',
    canvasClass: htmlPrefix + '-canvas',
    selectedClass: htmlPrefix + '-selected',
    editClass: htmlPrefix + '-edit',
    activeClass: htmlPrefix + '-active',
    hoverClass: htmlPrefix + '-hover',
    draggingClass: htmlPrefix + '-dragging',
    edgeClass: htmlPrefix + '-edge',
    edgeLabelClass: htmlPrefix + '-edge-label',
    connectorClass: htmlPrefix + '-connector',
    magnetClass: htmlPrefix + '-magnet',
    nodeClass: htmlPrefix + '-node',
    nodeOverlayClass: htmlPrefix + '-node-overlay',
    leftConnectorClass: htmlPrefix + '-' + leftConnectorType + 's',
    rightConnectorClass: htmlPrefix + '-' + rightConnectorType + 's',
    canvasResizeThreshold: 200,
    canvasResizeStep: 200
};
class BaseError {
    constructor() {
        Error.apply(this, arguments);
    }
}
Object.defineProperty(BaseError, 'prototype', new Error());
export class ModelvalidationError extends BaseError {
    constructor(message) {
        super();
        this.message = message;
    }
}
export function fcTopSort(graph) {
    const adjacentList = {};
    graph.nodes.forEach((node) => {
        adjacentList[node.id] = { incoming: 0, outgoing: [] };
    });
    graph.edges.forEach((edge) => {
        const sourceNode = graph.nodes.filter((node) => {
            return node.connectors.some((connector) => {
                return connector.id === edge.source;
            });
        })[0];
        const destinationNode = graph.nodes.filter((node) => {
            return node.connectors.some((connector) => {
                return connector.id === edge.destination;
            });
        })[0];
        adjacentList[sourceNode.id].outgoing.push(destinationNode.id);
        adjacentList[destinationNode.id].incoming++;
    });
    const orderedNodes = [];
    const sourceNodes = [];
    for (const node of Object.keys(adjacentList)) {
        const edges = adjacentList[node];
        if (edges.incoming === 0) {
            sourceNodes.push(node);
        }
    }
    while (sourceNodes.length !== 0) {
        const sourceNode = sourceNodes.pop();
        for (let i = 0; i < adjacentList[sourceNode].outgoing.length; i++) {
            const destinationNode = adjacentList[sourceNode].outgoing[i];
            adjacentList[destinationNode].incoming--;
            if (adjacentList[destinationNode].incoming === 0) {
                sourceNodes.push(destinationNode);
            }
            adjacentList[sourceNode].outgoing.splice(i, 1);
            i--;
        }
        orderedNodes.push(sourceNode);
    }
    let hasEdges = false;
    for (const node of Object.keys(adjacentList)) {
        const edges = adjacentList[node];
        if (edges.incoming !== 0) {
            hasEdges = true;
        }
    }
    if (hasEdges) {
        return null;
    }
    else {
        return orderedNodes;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZsb3djaGFydC5tb2RlbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZmxvd2NoYXJ0L3NyYy9saWIvbmd4LWZsb3djaGFydC5tb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUdyRCxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRyxJQUFJLGNBQWMsQ0FBd0IsMEJBQTBCLENBQUMsQ0FBQztBQU05RyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDeEIsTUFBTSxpQkFBaUIsR0FBRyxlQUFlLENBQUM7QUFDMUMsTUFBTSxrQkFBa0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUU1QyxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRztJQUNoQyxVQUFVO0lBQ1YsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixXQUFXLEVBQUUsUUFBUTtJQUNyQixTQUFTLEVBQUUsTUFBTTtJQUNqQixvQkFBb0IsRUFBRSxTQUFTO0lBQy9CLG1CQUFtQixFQUFFLFFBQVE7SUFDN0IsV0FBVyxFQUFFLFVBQVUsR0FBRyxTQUFTO0lBQ25DLGFBQWEsRUFBRSxVQUFVLEdBQUcsV0FBVztJQUN2QyxTQUFTLEVBQUUsVUFBVSxHQUFHLE9BQU87SUFDL0IsV0FBVyxFQUFFLFVBQVUsR0FBRyxTQUFTO0lBQ25DLFVBQVUsRUFBRSxVQUFVLEdBQUcsUUFBUTtJQUNqQyxhQUFhLEVBQUUsVUFBVSxHQUFHLFdBQVc7SUFDdkMsU0FBUyxFQUFFLFVBQVUsR0FBRyxPQUFPO0lBQy9CLGNBQWMsRUFBRSxVQUFVLEdBQUcsYUFBYTtJQUMxQyxjQUFjLEVBQUUsVUFBVSxHQUFHLFlBQVk7SUFDekMsV0FBVyxFQUFFLFVBQVUsR0FBRyxTQUFTO0lBQ25DLFNBQVMsRUFBRSxVQUFVLEdBQUcsT0FBTztJQUMvQixnQkFBZ0IsRUFBRSxVQUFVLEdBQUcsZUFBZTtJQUM5QyxrQkFBa0IsRUFBRSxVQUFVLEdBQUcsR0FBRyxHQUFHLGlCQUFpQixHQUFHLEdBQUc7SUFDOUQsbUJBQW1CLEVBQUUsVUFBVSxHQUFHLEdBQUcsR0FBRyxrQkFBa0IsR0FBRyxHQUFHO0lBQ2hFLHFCQUFxQixFQUFFLEdBQUc7SUFDMUIsZ0JBQWdCLEVBQUUsR0FBRztDQUN0QixDQUFDO0FBeUdGLE1BQU0sU0FBUztJQUNiO1FBQ0UsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQztBQUUzRCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsU0FBUztJQUNqRCxZQUFtQixPQUFlO1FBQ2hDLEtBQUssRUFBRSxDQUFDO1FBRFMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUVsQyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLEtBQWM7SUFDdEMsTUFBTSxZQUFZLEdBQW1CLEVBQUUsQ0FBQztJQUN4QyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzNCLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUMsQ0FBQztJQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDM0IsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM3QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3hDLE9BQU8sU0FBUyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTixNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDeEMsT0FBTyxTQUFTLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNOLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUQsWUFBWSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sWUFBWSxHQUFhLEVBQUUsQ0FBQztJQUNsQyxNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7SUFDakMsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzVDLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEI7S0FDRjtJQUNELE9BQU8sV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDL0IsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqRSxNQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6QyxJQUFJLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO2dCQUNoRCxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ25DO1lBQ0QsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9DLENBQUMsRUFBRSxDQUFDO1NBQ0w7UUFDRCxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLEtBQUssTUFBTSxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUM1QyxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtZQUN4QixRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ2pCO0tBQ0Y7SUFDRCxJQUFJLFFBQVEsRUFBRTtRQUNaLE9BQU8sSUFBSSxDQUFDO0tBQ2I7U0FBTTtRQUNMLE9BQU8sWUFBWSxDQUFDO0tBQ3JCO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGY05vZGVDb21wb25lbnQgfSBmcm9tICcuL25vZGUuY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IEZDX05PREVfQ09NUE9ORU5UX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxGY05vZGVDb21wb25lbnRDb25maWc+KCdmYy1ub2RlLmNvbXBvbmVudC5jb25maWcnKTtcblxuZXhwb3J0IGludGVyZmFjZSBGY05vZGVDb21wb25lbnRDb25maWcge1xuICBub2RlQ29tcG9uZW50VHlwZTogVHlwZTxGY05vZGVDb21wb25lbnQ+O1xufVxuXG5jb25zdCBodG1sUHJlZml4ID0gJ2ZjJztcbmNvbnN0IGxlZnRDb25uZWN0b3JUeXBlID0gJ2xlZnRDb25uZWN0b3InO1xuY29uc3QgcmlnaHRDb25uZWN0b3JUeXBlID0gJ3JpZ2h0Q29ubmVjdG9yJztcblxuZXhwb3J0IGNvbnN0IEZsb3djaGFydENvbnN0YW50cyA9IHtcbiAgaHRtbFByZWZpeCxcbiAgbGVmdENvbm5lY3RvclR5cGUsXG4gIHJpZ2h0Q29ubmVjdG9yVHlwZSxcbiAgY3VydmVkU3R5bGU6ICdjdXJ2ZWQnLFxuICBsaW5lU3R5bGU6ICdsaW5lJyxcbiAgZHJhZ0FuaW1hdGlvblJlcGFpbnQ6ICdyZXBhaW50JyxcbiAgZHJhZ0FuaW1hdGlvblNoYWRvdzogJ3NoYWRvdycsXG4gIGNhbnZhc0NsYXNzOiBodG1sUHJlZml4ICsgJy1jYW52YXMnLFxuICBzZWxlY3RlZENsYXNzOiBodG1sUHJlZml4ICsgJy1zZWxlY3RlZCcsXG4gIGVkaXRDbGFzczogaHRtbFByZWZpeCArICctZWRpdCcsXG4gIGFjdGl2ZUNsYXNzOiBodG1sUHJlZml4ICsgJy1hY3RpdmUnLFxuICBob3ZlckNsYXNzOiBodG1sUHJlZml4ICsgJy1ob3ZlcicsXG4gIGRyYWdnaW5nQ2xhc3M6IGh0bWxQcmVmaXggKyAnLWRyYWdnaW5nJyxcbiAgZWRnZUNsYXNzOiBodG1sUHJlZml4ICsgJy1lZGdlJyxcbiAgZWRnZUxhYmVsQ2xhc3M6IGh0bWxQcmVmaXggKyAnLWVkZ2UtbGFiZWwnLFxuICBjb25uZWN0b3JDbGFzczogaHRtbFByZWZpeCArICctY29ubmVjdG9yJyxcbiAgbWFnbmV0Q2xhc3M6IGh0bWxQcmVmaXggKyAnLW1hZ25ldCcsXG4gIG5vZGVDbGFzczogaHRtbFByZWZpeCArICctbm9kZScsXG4gIG5vZGVPdmVybGF5Q2xhc3M6IGh0bWxQcmVmaXggKyAnLW5vZGUtb3ZlcmxheScsXG4gIGxlZnRDb25uZWN0b3JDbGFzczogaHRtbFByZWZpeCArICctJyArIGxlZnRDb25uZWN0b3JUeXBlICsgJ3MnLFxuICByaWdodENvbm5lY3RvckNsYXNzOiBodG1sUHJlZml4ICsgJy0nICsgcmlnaHRDb25uZWN0b3JUeXBlICsgJ3MnLFxuICBjYW52YXNSZXNpemVUaHJlc2hvbGQ6IDIwMCxcbiAgY2FudmFzUmVzaXplU3RlcDogMjAwXG59O1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmNDb29yZHMge1xuICB4PzogbnVtYmVyO1xuICB5PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjUmVjdEJveCB7XG4gIHRvcDogbnVtYmVyO1xuICBsZWZ0OiBudW1iZXI7XG4gIHJpZ2h0OiBudW1iZXI7XG4gIGJvdHRvbTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjQ29ubmVjdG9yIHtcbiAgaWQ6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjTm9kZSBleHRlbmRzIEZjQ29vcmRzIHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBjb25uZWN0b3JzOiBBcnJheTxGY0Nvbm5lY3Rvcj47XG4gIHJlYWRvbmx5PzogYm9vbGVhbjtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjTm9kZVJlY3RJbmZvIHtcbiAgd2lkdGgoKTogbnVtYmVyO1xuICBoZWlnaHQoKTogbnVtYmVyO1xuICB0b3AoKTogbnVtYmVyO1xuICBsZWZ0KCk6IG51bWJlcjtcbiAgcmlnaHQoKTogbnVtYmVyO1xuICBib3R0b20oKTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjQ29ubmVjdG9yUmVjdEluZm8ge1xuICB0eXBlOiBzdHJpbmc7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBub2RlUmVjdEluZm86IEZjTm9kZVJlY3RJbmZvO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjRWRnZSB7XG4gIGxhYmVsPzogc3RyaW5nO1xuICBzb3VyY2U/OiBzdHJpbmc7XG4gIGRlc3RpbmF0aW9uPzogc3RyaW5nO1xuICBhY3RpdmU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjSXRlbUluZm8ge1xuICBub2RlPzogRmNOb2RlO1xuICBlZGdlPzogRmNFZGdlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZjTW9kZWwge1xuICBub2RlczogQXJyYXk8RmNOb2RlPjtcbiAgZWRnZXM6IEFycmF5PEZjRWRnZT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckNhbGxiYWNrcyB7XG4gIGRyb3BOb2RlPzogKGV2ZW50OiBFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBjcmVhdGVFZGdlPzogKGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSA9PiBPYnNlcnZhYmxlPEZjRWRnZT47XG4gIGVkZ2VBZGRlZD86IChlZGdlOiBGY0VkZ2UpID0+IHZvaWQ7XG4gIG5vZGVSZW1vdmVkPzogKG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgZWRnZVJlbW92ZWQ/OiAoZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuICBlZGdlRG91YmxlQ2xpY2s/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIGVkZ2U6IEZjRWRnZSkgPT4gdm9pZDtcbiAgZWRnZU1vdXNlT3Zlcj86IChldmVudDogTW91c2VFdmVudCwgZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuICBpc1ZhbGlkRWRnZT86IChzb3VyY2U6IEZjQ29ubmVjdG9yLCBkZXN0aW5hdGlvbjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW47XG4gIGVkZ2VFZGl0PzogKGV2ZW50OiBFdmVudCwgZWRnZTogRmNFZGdlKSA9PiB2b2lkO1xuICBub2RlQ2FsbGJhY2tzPzogVXNlck5vZGVDYWxsYmFja3M7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlck5vZGVDYWxsYmFja3Mge1xuICBub2RlRWRpdD86IChldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBkb3VibGVDbGljaz86IChldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBtb3VzZURvd24/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgbW91c2VFbnRlcj86IChldmVudDogTW91c2VFdmVudCwgbm9kZTogRmNOb2RlKSA9PiB2b2lkO1xuICBtb3VzZUxlYXZlPzogKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmNDYWxsYmFja3Mge1xuICBub2RlRHJhZ3N0YXJ0OiAoZXZlbnQ6IEV2ZW50IHwgYW55LCBub2RlOiBGY05vZGUpID0+IHZvaWQ7XG4gIG5vZGVEcmFnZW5kOiAoZXZlbnQ6IEV2ZW50IHwgYW55KSA9PiB2b2lkO1xuICBlZGdlRHJhZ3N0YXJ0OiAoZXZlbnQ6IEV2ZW50IHwgYW55LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSA9PiB2b2lkO1xuICBlZGdlRHJhZ2VuZDogKGV2ZW50OiBFdmVudCB8IGFueSkgPT4gdm9pZDtcbiAgZWRnZURyb3A6IChldmVudDogRXZlbnQgfCBhbnksIHRhcmdldENvbm5lY3RvcjogRmNDb25uZWN0b3IpID0+IGJvb2xlYW47XG4gIGVkZ2VEcmFnb3ZlckNvbm5lY3RvcjogKGV2ZW50OiBFdmVudCB8IGFueSwgY29ubmVjdG9yOiBGY0Nvbm5lY3RvcikgPT4gYm9vbGVhbjtcbiAgZWRnZURyYWdvdmVyTWFnbmV0OiAoZXZlbnQ6IEV2ZW50IHwgYW55LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSA9PiBib29sZWFuO1xuICBlZGdlRHJhZ2xlYXZlTWFnbmV0OiAoZXZlbnQ6IEV2ZW50IHwgYW55KSA9PiB2b2lkO1xuICBub2RlTW91c2VPdmVyOiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgbm9kZU1vdXNlT3V0OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbiAgY29ubmVjdG9yTW91c2VFbnRlcjogKGV2ZW50OiBNb3VzZUV2ZW50LCBjb25uZWN0b3I6IEZjQ29ubmVjdG9yKSA9PiB2b2lkO1xuICBjb25uZWN0b3JNb3VzZUxlYXZlOiAoZXZlbnQ6IE1vdXNlRXZlbnQsIGNvbm5lY3RvcjogRmNDb25uZWN0b3IpID0+IHZvaWQ7XG4gIG5vZGVDbGlja2VkOiAoZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IEZjTm9kZSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGY0FkamFjZW50TGlzdCB7XG4gIFtpZDogc3RyaW5nXToge1xuICAgIGluY29taW5nOiBudW1iZXI7XG4gICAgb3V0Z29pbmc6IEFycmF5PHN0cmluZz47XG4gIH07XG59XG5cbmNsYXNzIEJhc2VFcnJvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIEVycm9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJhc2VFcnJvciwgJ3Byb3RvdHlwZScsIG5ldyBFcnJvcigpKTtcblxuZXhwb3J0IGNsYXNzIE1vZGVsdmFsaWRhdGlvbkVycm9yIGV4dGVuZHMgQmFzZUVycm9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZjVG9wU29ydChncmFwaDogRmNNb2RlbCk6IEFycmF5PHN0cmluZz4gfCBudWxsIHtcbiAgY29uc3QgYWRqYWNlbnRMaXN0OiBGY0FkamFjZW50TGlzdCA9IHt9O1xuICBncmFwaC5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgYWRqYWNlbnRMaXN0W25vZGUuaWRdID0ge2luY29taW5nOiAwLCBvdXRnb2luZzogW119O1xuICB9KTtcbiAgZ3JhcGguZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZU5vZGUgPSBncmFwaC5ub2Rlcy5maWx0ZXIoKG5vZGUpID0+IHtcbiAgICAgIHJldHVybiBub2RlLmNvbm5lY3RvcnMuc29tZSgoY29ubmVjdG9yKSA9PiB7XG4gICAgICAgIHJldHVybiBjb25uZWN0b3IuaWQgPT09IGVkZ2Uuc291cmNlO1xuICAgICAgfSk7XG4gICAgfSlbMF07XG4gICAgY29uc3QgZGVzdGluYXRpb25Ob2RlID0gZ3JhcGgubm9kZXMuZmlsdGVyKChub2RlKSA9PiB7XG4gICAgICByZXR1cm4gbm9kZS5jb25uZWN0b3JzLnNvbWUoKGNvbm5lY3RvcikgPT4ge1xuICAgICAgICByZXR1cm4gY29ubmVjdG9yLmlkID09PSBlZGdlLmRlc3RpbmF0aW9uO1xuICAgICAgfSk7XG4gICAgfSlbMF07XG4gICAgYWRqYWNlbnRMaXN0W3NvdXJjZU5vZGUuaWRdLm91dGdvaW5nLnB1c2goZGVzdGluYXRpb25Ob2RlLmlkKTtcbiAgICBhZGphY2VudExpc3RbZGVzdGluYXRpb25Ob2RlLmlkXS5pbmNvbWluZysrO1xuICB9KTtcbiAgY29uc3Qgb3JkZXJlZE5vZGVzOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCBzb3VyY2VOb2Rlczogc3RyaW5nW10gPSBbXTtcbiAgZm9yIChjb25zdCBub2RlIG9mIE9iamVjdC5rZXlzKGFkamFjZW50TGlzdCkpIHtcbiAgICBjb25zdCBlZGdlcyA9IGFkamFjZW50TGlzdFtub2RlXTtcbiAgICBpZiAoZWRnZXMuaW5jb21pbmcgPT09IDApIHtcbiAgICAgIHNvdXJjZU5vZGVzLnB1c2gobm9kZSk7XG4gICAgfVxuICB9XG4gIHdoaWxlIChzb3VyY2VOb2Rlcy5sZW5ndGggIT09IDApIHtcbiAgICBjb25zdCBzb3VyY2VOb2RlID0gc291cmNlTm9kZXMucG9wKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGphY2VudExpc3Rbc291cmNlTm9kZV0ub3V0Z29pbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uTm9kZSA9IGFkamFjZW50TGlzdFtzb3VyY2VOb2RlXS5vdXRnb2luZ1tpXTtcbiAgICAgIGFkamFjZW50TGlzdFtkZXN0aW5hdGlvbk5vZGVdLmluY29taW5nLS07XG4gICAgICBpZiAoYWRqYWNlbnRMaXN0W2Rlc3RpbmF0aW9uTm9kZV0uaW5jb21pbmcgPT09IDApIHtcbiAgICAgICAgc291cmNlTm9kZXMucHVzaChkZXN0aW5hdGlvbk5vZGUpO1xuICAgICAgfVxuICAgICAgYWRqYWNlbnRMaXN0W3NvdXJjZU5vZGVdLm91dGdvaW5nLnNwbGljZShpLCAxKTtcbiAgICAgIGktLTtcbiAgICB9XG4gICAgb3JkZXJlZE5vZGVzLnB1c2goc291cmNlTm9kZSk7XG4gIH1cbiAgbGV0IGhhc0VkZ2VzID0gZmFsc2U7XG4gIGZvciAoY29uc3Qgbm9kZSBvZiBPYmplY3Qua2V5cyhhZGphY2VudExpc3QpKSB7XG4gICAgY29uc3QgZWRnZXMgPSBhZGphY2VudExpc3Rbbm9kZV07XG4gICAgaWYgKGVkZ2VzLmluY29taW5nICE9PSAwKSB7XG4gICAgICBoYXNFZGdlcyA9IHRydWU7XG4gICAgfVxuICB9XG4gIGlmIChoYXNFZGdlcykge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBvcmRlcmVkTm9kZXM7XG4gIH1cbn1cbiJdfQ==