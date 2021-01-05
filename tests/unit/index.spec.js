import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/main/components/HelloWorld';

describe('main', () => {
  it('renders HelloWorld.vue', () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        msg: 'zheshiyigetishi',
      },
    });

    expect(wrapper.text()).toMatch('zheshiyigetishi');
  });
});
