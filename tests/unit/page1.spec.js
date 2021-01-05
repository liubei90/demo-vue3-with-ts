import { shallowMount } from '@vue/test-utils';
import App from '@/page1/App';

describe('page1', () => {
  it('renders App.vue', () => {
    const wrapper = shallowMount(App);

    expect(wrapper.text()).toEqual('hello, world');
  });
});
