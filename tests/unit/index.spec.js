import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/index/components/HelloWorld';

describe('index', () => {
  it('renders HelloWorld.vue', () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        msg: 'zheshiyigetishi',
      },
    });

    expect(wrapper.text()).toMatch('zheshiyigetishi');
  });
});
