import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../index'

describe('button test', () => {
  it('Successful rendering of the button component', () => {
    const wrapper = render(<Button>按钮</Button>)

    expect(wrapper.container.innerHTML).toMatchSnapshot()
  })

  it('should trigger a click event', () => {
    const clickFn = jest.fn(() => {})

    const wrapper = render(<Button onClick={clickFn}>按钮</Button>)
    wrapper.getByRole('button').click()

    expect(clickFn).toHaveBeenCalled()
    expect(wrapper.container.innerHTML).toMatchSnapshot()
  })

  it('should not trigger click event when disabled', () => {
    const clickFn = jest.fn(() => {})

    const props = {
      disabled: true,
      onClick: clickFn,
    }

    const wrapper = render(<Button {...props}>按钮</Button>)
    wrapper.getByRole('button').click()

    expect(clickFn).not.toHaveBeenCalled()
    expect(wrapper.container.innerHTML).toMatchSnapshot()
  })

  it('should not trigger click event when loading', () => {
    const clickFn = jest.fn(() => {})

    const props = {
      loading: true,
      onClick: clickFn,
    }

    const wrapper = render(<Button {...props}>按钮</Button>)
    wrapper.getByRole('button').click()

    expect(clickFn).not.toHaveBeenCalled()
    expect(wrapper.container.innerHTML).toMatchSnapshot()
  })

  it('should hide border when color is gradient', () => {
    const props = {
      color: 'linear-gradient(#000, #fff)',
    }

    const wrapper = render(<Button {...props}>按钮</Button>)
    const button = wrapper.getByRole('button')

    expect(button.style.border).toEqual('0px')
    expect(wrapper.container.innerHTML).toMatchSnapshot()
  })

  it('should render loading slot correctly', () => {
    const props = {
      loading: true,
      loadingText: '加载中',
    }

    const wrapper = render(<Button {...props}>按钮</Button>)

    expect(wrapper.getByText('加载中')).toBeTruthy()
    expect(wrapper.container.innerHTML).toMatchSnapshot()
  })

  it('should render loading of a specific size when using loading-size prop', () => {
    const props = {
      loading: true,
      loadingSize: '10px',
    }

    const wrapper = render(<Button {...props}>按钮</Button>)
    const loading = wrapper.container.querySelector('.rv-loading__spinner')

    expect(loading).toHaveStyle({ width: '10px', height: '10px' })
    expect(wrapper.container.innerHTML).toMatchSnapshot()
  })
})
