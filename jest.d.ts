/// <reference types="@testing-library/jest-dom" />

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveClass(...classNames: string[]): R
      toHaveStyle(css: string | object): R
      toHaveTextContent(text?: string | RegExp): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toBeChecked(): R
      toHaveValue(value?: string | number | string[]): R
      toHaveFocus(): R
      toBeEmpty(): R
      toHaveLength(length: number): R
    }
  }
}

export {}
