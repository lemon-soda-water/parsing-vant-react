import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Skeleton from '../index'

describe('skeleton test', () => {
  it('Successful rendering of the skeleton component', () => {
    const wrapper = render(<Skeleton />)

    expect(wrapper.container.innerHTML).toMatchSnapshot()
  })

  it('should render with row width array correctly', () => {
    const props = {
      row: 4,
      rowWidth: ['100%', 30, '5rem'],
    }

    const wrapper = render(<Skeleton {...props} />)

    expect(wrapper.container.innerHTML).toMatchSnapshot()
  })

  it('should render props children when loading is false', () => {
    const wrapper = render(
      <Skeleton loading={false}>
        <div>Content</div>
      </Skeleton>,
    )

    expect(wrapper.container.innerHTML).toMatchSnapshot()
  })

  it('should change avatar size when using avatar-size prop', () => {
    const props = {
      avatar: true,
      avatarSize: '20rem',
    }

    const wrapper = render(<Skeleton {...props} />)
    const avatar = wrapper.container.querySelector('.rv-skeleton__avatar')

    expect(avatar).toHaveStyle({ width: '20rem', height: '20rem' })
    expect(wrapper.container.innerHTML).toMatchSnapshot()
  })

  it('should change avatar shape when using avatar-shape prop', () => {
    const props = {
      avatar: true,
      avatarShape: 'square' as const,
    }

    const wrapper = render(<Skeleton {...props} />)
    const avatar = wrapper.container.querySelector('.rv-skeleton__avatar')

    expect(avatar?.innerHTML).toMatchSnapshot()
  })

  it('should be round when using round prop', () => {
    const props = {
      title: true,
      round: true,
      avatar: true,
    }

    const wrapper = render(<Skeleton {...props} />)
    const avatar = wrapper.container.querySelector('.rv-skeleton--round')

    expect(avatar).toBeTruthy()
  })

  it('should allow to disable animation', async () => {
    const props = {
      row: 1,
    }

    const wrapper = render(<Skeleton {...props} />)
    expect(
      wrapper.container.querySelector('.rv-skeleton--animate'),
    ).toBeTruthy()

    const newWrapper = render(<Skeleton {...props} animate={false} />)
    expect(
      newWrapper.container.querySelector('.rv-skeleton--animate'),
    ).toBeFalsy()
  })
})
