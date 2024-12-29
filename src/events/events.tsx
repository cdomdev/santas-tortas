class EventEmitter {
    private eventTarget: EventTarget;

    constructor() {
        this.eventTarget = new EventTarget();
    }

    emit(eventName: string, detail?: any) {
        const event = new CustomEvent(eventName, { detail });
        this.eventTarget.dispatchEvent(event);
    }

    on(eventName: string, callback: (event: CustomEvent<any>) => void) {
        this.eventTarget.addEventListener(eventName, callback as EventListener);
    }

    off(eventName: string, callback: (event: CustomEvent<any>) => void) {
        this.eventTarget.removeEventListener(eventName, callback as EventListener);
    }
}

export const eventEmitter = typeof window !== 'undefined' ? new EventEmitter() : null;
