import { ComponentFixture, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

/**
 * Wait a tick, then detect changes
 * @param fixture
 */
export function advance(fixture: ComponentFixture<unknown>): void {
  tick();
  fixture.detectChanges();
}

export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 },
};

/**
 * Simulates a click on the element. Defaults to left-click event
 * @param element
 * @param eventObj
 */
export function click(element: DebugElement | HTMLElement, eventObj = ButtonClickEvents.left): void {
  if (element instanceof HTMLElement) {
    element.click();
  } else {
    element.triggerEventHandler('click', eventObj);
  }
}
