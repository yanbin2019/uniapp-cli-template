import Form from '@/components/y-form/y-form.vue'
import Textarea from '@/components/y-textarea/y-textarea.vue'
import Input from "@/components/y-input/y-input.vue";
import Select from '@/components/y-select/y-select.vue'
import Popup from '@/components/y-popup/y-popup.vue'
import ImgUpload from '@/components/y-img-upload/y-img-upload.vue'
import Datetime from '@/components/y-datetime/y-datetime.vue'
import Layout from '@/components/y-layout/y-layout.vue'
import Navbar from '@/components/y-navbar/y-navbar.vue'
import Tabbar from '@/components/y-tabbar/y-tabbar.vue'
import Table from '@/components/y-table/y-table.vue'
const component = {
  'y-form': Form,
  'y-textarea': Textarea,
  'y-input': Input,
  'y-select': Select,
  'y-img-upload': ImgUpload,
  'y-datetime': Datetime,
  'y-layout': Layout,
  'y-tabbar': Tabbar,
  'y-navbar': Navbar,
  'y-popup': Popup,
  'y-table':Table
}
export default {
  install(Vue) {
    for (const key in component) {
      Vue.component(key,component[key])
    }
  }
}