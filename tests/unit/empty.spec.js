import { shallowMount } from '@vue/test-utils';
import App from '@/empty/App';

describe('empty', () => {
  it('renders App.vue', () => {
    const wrapper = shallowMount(App);

    expect(wrapper.text()).toEqual('hello, world');
  });
});
