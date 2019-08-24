import axios from 'axios'

export const cmsListTag = () => axios.get('http://127.0.0.1:3456/cms_list_tag?nid=23831003&type=2006&pageNo=0&pageSize=10')