import moment from 'moment'
import Vue from 'vue'

Vue.filter('localTime', value =>
  moment
    .utc(value)
    .local()
    .format('YYYY-MM-DD HH:mm:ss')
)
