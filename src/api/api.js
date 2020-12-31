import axios from './http'
import { API_ROOT } from './config'

//查询机构列表
export const getOrgList = params => { return axios.post(`${API_ROOT}v1/org/list`, params).then(res => res.data).catch(error => { console.log(error); }) };
//新增机构
export const addOrg = params => { return axios.post(`${API_ROOT}v1/org`, params).then(res => res.data).catch(error => { console.log(error); }) };
//获取机构详情
export const getOrgDetail = params => { return axios.get(`${API_ROOT}v1/org/` + params).then(res => res.data).catch(error => { console.log(error); }) };
//编辑机构
export const editOrg = params => { return axios.put(`${API_ROOT}v1/org`, params).then(res => res.data).catch(error => { console.log(error); }) };
//删除机构
export const deleteOrg = params => { return axios.delete(`${API_ROOT}v1/org/` + params).then(res => res.data).catch(error => { console.log(error); }) };

