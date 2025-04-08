<?php

namespace App\Controllers;

use App\Models\Auth_model;
use App\Models\Sub_activity_model;


class Api extends BaseController
{
    protected $Auth_model;
    protected $Sub_activity_model;
    protected $db;

    public function __construct()
    {
        $this->Auth_model = new Auth_model();
        $this->Sub_activity_model = new Sub_activity_model();
        $this->db = \Config\Database::connect();
    }

    public function cek_token($token = null)
    {
        if (empty($token)) {
            return false;
        } else {
            $tokenx = array("6uovXhXorT6TaGlK5DzE3S9QbYbPVKXdTq3iUTvK90ucgSCD4o7Dxmg0q3Bbgtus", "d8bBKsrxYOsJBug4harSDHWd3koADG75rbEXTbRLyb2bkomPCHMy8rLGsXOFqt0C");
            if (in_array($token, $tokenx)) {
                return true;
            } else {
                return false;
            }
        }
    }

    public function get_csrf()
    {
        $data['name'] = "Token";
        $data['token'] = "6uovXhXorT6TaGlK5DzE3S9QbYbPVKXdTq3iUTvK90ucgSCD4o7Dxmg0q3Bbgtus";
        return $this->response->setJSON($data);
    }

    public function login_mobile()
    {
        $request = request();
        $token = $this->request->getPost('Token');
        $cek_token = $this->cek_token($token);
        if ($cek_token) {
            $email = $this->request->getPost('email');
            $numericString = preg_replace('/\D/', '', $email);
            $cekemail = 0;
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $cekemail = $this->Auth_model->where('email', $email)->get()->getNumRows();
                $user = $this->Auth_model->where('email', $email)->get()->getResult();
                if ($cekemail == 0) {
                    $return = [
                        'status' => 'ERROR',
                        'message' => 'Your email is incorrect or not registered'
                    ];
                    return $this->response->setJSON($return);
                }
            } else {
                $return = [
                    'status' => 'ERROR',
                    'message' => 'Invalid email format. Please enter a correct email address.'
                ];
                return $this->response->setJSON($return);
            }
            $password = $this->request->getPost('password');
            if (strlen($password) < 6) {
                $return = [
                    'status' => 'ERROR',
                    'message' => 'Password less than 6 characters'
                ];
                return $this->response->setJSON($return);
            }
            if ($cekemail != 0) {
                if (md5($password) == $user[0]->password) {
                    $datasave['id'] = $user[0]->id;
                    $datasave['name'] = $user[0]->name;
                    $datasave['email'] = $user[0]->email;
                    $datasave['admin'] = false;
                    $datasave['role_id'] = $user[0]->role_id;
                    $datasave['leader'] = $user[0]->leader;
                    $datasave['status'] = $user[0]->status;
                    $datasave['photo'] = $user[0]->photo;
                    $return = [
                        'status' => 'SUCCESS',
                        'message' => 'Wellcome at Simonev',
                        'datasave' => $datasave
                    ];
                    return $this->response->setJSON($return);
                } else {
                    $return = [
                        'status' => 'ERROR',
                        'message' => 'Wrong password'
                    ];
                    return $this->response->setJSON($return);
                }
            } else {
                $return = [
                    'status' => 'ERROR',
                    'message' => 'Invalid email format. Please enter a correct email address'
                ];
                return $this->response->setJSON($return);
            }
        } else {
            $return = [
                'status' => 'ERROR',
                'message' => 'Unauthorized: Invalid or missing token. Please log in again.'
            ];
            return $this->response->setJSON($return);
        }
    }

    public function get_data_sub_activities()
    {
        $iduser = $_GET['id_user'];
        $user = $this->Auth_model->where('id', $iduser)->get()->getResultArray();
        if (count($user) == 0) {
            $return = [
                'status' => 'ERROR',
                'message' => 'User not found'
            ];
            return $this->response->setJSON($return);
        } else {
            $datasub =   $this->Sub_activity_model->get_data_sub_activities_user($iduser);
            $return = [
                'status' => 'SUCCESS',
                'message' => 'Data found',
                'data' =>  $datasub
            ];
            return $this->response->setJSON($return);
        }
    }

    public function get_data_sub_activities_detail()
    {
        $idsub = $_GET['id_subac_detail'];
        $datasub = $this->Sub_activity_model->where('id', $idsub)->get()->getResultArray();
        if (count($datasub) == 0 || $datasub == null) {
            $return = [
                'status' => 'ERROR',
                'message' => 'User not found'
            ];
            return $this->response->setJSON($return);
        } else {
            $datasub =   $this->Sub_activity_model->get_data_sub_activities_detail($idsub);
            $return = [
                'status' => 'SUCCESS',
                'message' => 'Data found',
                'data' =>  $datasub
            ];
            return $this->response->setJSON($return);
        }
    }
    
    public function get_data_sub_activities_detail2()
    {
        $idsub = $_GET['id_subac_detail'];
        $datasub = $this->Sub_activity_model->where('id', $idsub)->get()->getResultArray();
        if (count($datasub) == 0 || $datasub == null) {
            $return = [
                'status' => 'ERROR',
                'message' => 'User not found'
            ];
            return $this->response->setJSON($return);
        } else {
            $datasub =   $this->Sub_activity_model->get_data_sub_activities_detail2($idsub);
            $return = [
                'status' => 'SUCCESS',
                'message' => 'Data found',
                'data' =>  $datasub
            ];
            return $this->response->setJSON($return);
        }
    }

    public function send_comment()
    {
        $token = $this->request->getPost('Token');
        $cek_token = $this->cek_token($token);
        if ($cek_token) {
            $data_comment = array(
                'sub_activity_id' => $this->request->getPost('sub_activity_id'),
                'sub_activity_report_id' => $this->request->getPost('sub_activity_report_id'),
                'comment' => $this->request->getPost('comment'),
                'created_at' => date('Y-m-d H:i:s'),
                'created_by' =>  $this->request->getPost('created_by'),
                'updated_at' => date('Y-m-d H:i:s'),
                'updated_by' =>  $this->request->getPost('created_by'),
            );
            $builderx = $this->db->table('sub_activity_comment');
            if ($builderx->insert($data_comment)) {
                $builder_user = $this->db->table('sub_activity_user');
                $builder_user->select('user_id');
                $builder_user->where('sub_activity_id', $this->request->getPost('sub_activity_id'));
                $builder_user->where('user_id !=', $this->request->getPost('created_by'));
                $data_user = $builder_user->get()->getResultArray();
                foreach ($data_user as $key_user => $value_user) {
                    $data_notif = array(
                        'sub_activity_id' => $this->request->getPost('sub_activity_id'),
                        'sub_activity_report_id' => $this->request->getPost('sub_activity_report_id'),
                        'user_id' => $value_user['user_id'],
                        'is_readed' => '0',
                        'type' => 'comment',
                        'created_at' => date('Y-m-d H:i:s'),
                        'created_by' => $this->request->getPost('created_by'),
                        'updated_at' => date('Y-m-d H:i:s'),
                        'updated_by' => $this->request->getPost('created_by'),
                    );
                    $builder_notif = $this->db->table('log_notif');
                    $builder_notif->insert($data_notif);
                }
                $return = [
                    'status' => 'SUCCESS',
                    'message' => 'Comment has been send'
                ];
                return $this->response->setJSON($return);
            } else {
                $return = [
                    'status' => 'ERROR',
                    'message' => 'error'
                ];
                return $this->response->setJSON($return);
            }
        } else {
            $return = [
                'status' => 'ERROR',
                'message' => 'Unauthorized: Invalid or missing token. Please log in again.'
            ];
            return $this->response->setJSON($return);
        }
    }

    public function get_data_sub_activities_report_byid()
    {
        $rid = $_GET['id_subac_report'];
        $dataf['detail'] = $this->db->table('sub_activity_report')
            ->where('id', $rid)->get()->getResultArray();
        if (count($dataf) > 0) {
            $dataf['report'] = $this->db->table('sub_activity_report')
                ->select('sub_activity_report.id,sub_activity_report.title,sub_activity_report.description, sub_activity_report.created_at,sub_activity_report.created_by, sub_activity_report_detail.achievment, sub_activity_report_detail.id as sard_id, indicator_target.measures,indicator_target.unit, indicator_target.timeline, users.name,users.photo')
                ->join('sub_activity_report_detail', 'sub_activity_report_detail.sub_activity_report_id = sub_activity_report.id')
                ->join('sub_activity_indicator', 'sub_activity_indicator.id = sub_activity_report_detail.sub_activity_indicator')
                ->join('indicator_target', 'indicator_target.id = sub_activity_indicator.indicator_id')
                ->join('users', 'users.id = sub_activity_report.created_by')
                ->where('sub_activity_report.id', $rid)
                ->get()->getResultArray();

            $dataf['gallery'] = $this->db->table('sub_activity_report_attachment')
            ->like('type', 'image/', 'after')
            ->where('sub_activity_report_id', $rid)->get()->getResultArray();

            $dataf['city'] = $this->db->table('sub_activity_report')
                ->select('sub_activity_report.*, 
                cities.id as city_id,cities.name as city, cities.type, cities.province, cities.province_id')
                ->join('cities', 'cities.id = sub_activity_report.location')
                ->where('sub_activity_report.id', $rid)->get()->getResultArray();

            $dataf['attachment'] = $this->db->table('sub_activity_report_attachment')
                ->like('type', 'application/', 'after')
                ->where('sub_activity_report_id', $rid)->get()->getResultArray();

            $dataf['comment'] = $this->db->table('sub_activity_comment')
                ->select('sub_activity_comment.*,users.photo,users.name')
                ->join('users', 'users.id = sub_activity_comment.created_by')
                ->where('sub_activity_comment.sub_activity_report_id', $rid)
                ->orderBy('sub_activity_comment.id', 'DESC')
                ->get()->getResultArray();

            $return = [
                'status' => 'SUCCESS',
                'message' => 'Data found',
                'data' => $dataf
            ];
            return $this->response->setJSON($return);
        } else {
            $return = [
                'status' => 'ERROR',
                'message' => 'Data not found'
            ];
            return $this->response->setJSON($return);
        }
    }

    public function get_data_initiative_report_byid()
    {
        $rid = $_GET['id_subac_report'];
        $dataf['detail'] = $this->db->table('sub_activity_report')
            ->where('id', $rid)->get()->getResultArray();
        if (count($dataf) > 0) {
            $dataf['report'] = $this->db->table('sub_activity_report')
                ->select('sub_activity_report.*, users.name,users.photo')
                // ->join('sub_activity_report_detail', 'sub_activity_report_detail.sub_activity_report_id = sub_activity_report.id')
                // ->join('sub_activity_indicator', 'sub_activity_indicator.id = sub_activity_report_detail.sub_activity_indicator')
                // ->join('indicator_target', 'indicator_target.id = sub_activity_indicator.indicator_id')
                ->join('users', 'users.id = sub_activity_report.created_by')
                ->where('sub_activity_report.id', $rid)
                ->get()->getResultArray();

            $dataf['gallery'] = $this->db->table('sub_activity_report_attachment')
            ->like('type', 'image/', 'after')
            ->where('sub_activity_report_id', $rid)->get()->getResultArray();

            $dataf['city'] = $this->db->table('sub_activity_report')
                ->select('sub_activity_report.*, 
                cities.id as city_id,cities.name as city, cities.type, cities.province, cities.province_id')
                ->join('cities', 'cities.id = sub_activity_report.location')
                ->where('sub_activity_report.id', $rid)->get()->getResultArray();

            $dataf['attachment'] = $this->db->table('sub_activity_report_attachment')
                ->like('type', 'application/', 'after')
                ->where('sub_activity_report_id', $rid)->get()->getResultArray();

            // $dataf['comment'] = $this->db->table('sub_activity_comment')
            //     ->select('sub_activity_comment.*,users.photo,users.name')
            //     ->join('users', 'users.id = sub_activity_comment.created_by')
            //     ->where('sub_activity_comment.sub_activity_report_id', $rid)
            //     ->orderBy('sub_activity_comment.id', 'DESC')
            //     ->get()->getResultArray();

            $return = [
                'status' => 'SUCCESS',
                'message' => 'Data found',
                'data' => $dataf
            ];
            return $this->response->setJSON($return);
        } else {
            $return = [
                'status' => 'ERROR',
                'message' => 'Data not found'
            ];
            return $this->response->setJSON($return);
        }
    }
    
    public function get_data_report_by_user()
    {
        $user_id = $_GET['id_user'];
        $dataf['report'] = $this->db->table('sub_activity_report')
            ->select('sub_activity_report.*, cities.type, cities.name as c_name')
            ->join('cities', 'cities.id = sub_activity_report.location')
            ->where('created_by', $user_id)
            ->where('status !=', 'approved')
            ->where('sub_activity_id', 0)
            ->get()->getResultArray();
        if (count($dataf) > 0) {
            $return = [
                'status' => 'SUCCESS',
                'message' => 'Data found',
                'data' => $dataf
            ];
            return $this->response->setJSON($return);
        } else {
            $return = [
                'status' => 'ERROR',
                'message' => 'Data not found'
            ];
            return $this->response->setJSON($return);
        }
    }

    public function get_data_pres_release()
    {
        $db      = \Config\Database::connect();
        $builder = $db->table('pres_release');
        $builder->select('pres_release.*');
        $builder->where('pres_release.status','1');
        $dataf['pres_release'] = $builder->get()->getResultArray();
        if (count($dataf) > 0) {
            $return = [
                'status' => 'SUCCESS',
                'message' => 'Data found',
                'data' => $dataf
            ];
            return $this->response->setJSON($return);
        } else {
            $return = [
                'status' => 'ERROR',
                'message' => 'Data not found'
            ];
            return $this->response->setJSON($return);
        }
    }

    public function get_detail_pres_release()
    {
        $slug = $_GET['slug'];
        $db      = \Config\Database::connect();
        $builder = $db->table('pres_release');
        $builder->select('pres_release.*');
        $builder->where('pres_release.slug',$slug);
        $builder->where('pres_release.status','1');
        $dataf['pres_release'] = $builder->get()->getRowArray();
        if (count($dataf) > 0) {
            $return = [
                'status' => 'SUCCESS',
                'message' => 'Data found',
                'data' => $dataf
            ];
            return $this->response->setJSON($return);
        } else {
            $return = [
                'status' => 'ERROR',
                'message' => 'Data not found'
            ];
            return $this->response->setJSON($return);
        }
    }

    public function ajax_get_expenditure_edit(){
        $id = $this->request->getGet()['id'];
        var_dump($id);
        die;
        if(!empty($id)){
            $db = \Config\Database::connect();
            $builder_budget_expensive = $db->table('sub_activity_expensive_budget');
            $builder_budget_expensive->select('sub_activity_expensive_budget.*, users.name, users.photo');
            $builder_budget_expensive->join('users','users.id = sub_activity_expensive_budget.created_by','left');
            $builder_budget_expensive->where('sub_activity_expensive_budget.id',$id);
            $budget_expensive = $builder_budget_expensive->get()->getRowArray();
            var_dump($budget_expensive);
            die;
            if(!empty($budget_expensive)){
                $budget_expensive['created_at'] = date_format(date_create($budget_expensive['created_at']),"d F, Y");
                $return = [
                    'data' => $budget_expensive,
                    'status' => "success"
                ];
            }else{
                $return = [
                    'data' => [],
                    'status' => "error"
                ];
            }
        }else{
            var_dump('Error');
            die;
            $return = [
                'data' => [],
                'status' => "error"
            ];
        }
        return $this->response->setJSON($return);
    }
    
    public function get_data_title_sub_activities_report()
    {
        $rid = $_GET['id_subac_report'];
        $data = $this->db->table('sub_activity_report')
            ->where('id', $rid)->get()->getRowArray();
        if ($data) {
            $return = array(
                'status' => 'SUCCESS',
                'title' => $data['title']
            );
            return $this->response->setJSON($return);
        } else {
            $return = [
                'status' => 'ERROR',
                'message' => 'Data not found'
            ];
            return $this->response->setJSON($return);
        }
    }
    
    public function get_data_male_female_sub_activities_report()
    {
        $rid = $_GET['id_subac_report'];
        $data = $this->db->table('sub_activity_report')
            ->where('id', $rid)->get()->getRowArray();
        if ($data) {
            $return = array(
                'status' => 'SUCCESS',
                'male' => $data['male'],
                'female' => $data['female']
            );
            return $this->response->setJSON($return);
        } else {
            $return = [
                'status' => 'ERROR',
                'message' => 'Data not found'
            ];
            return $this->response->setJSON($return);
        }
    }
    
    public function get_data_description_sub_activities_report()
    {
        $rid = $_GET['id_subac_report'];
        $data = $this->db->table('sub_activity_report')
            ->where('id', $rid)->get()->getRowArray();
        if ($data) {
            $return = array(
                'status' => 'SUCCESS',
                'description' => $data['description']
            );
            return $this->response->setJSON($return);
        } else {
            $return = [
                'status' => 'ERROR',
                'message' => 'Data not found'
            ];
            return $this->response->setJSON($return);
        }
    }
    
    public function get_data_location_sub_activities_report()
    {
        $rid = $_GET['id_subac_report'];
        $builder = $this->db->table('sub_activity_report');
        $builder->select('sub_activity_report.location, sub_activity_report.sub_activity_id');
        $data = $builder->where('sub_activity_report.id', $rid)->get()->getRowArray();
        $builder_location = $this->db->table('sub_activity_city');
        $builder_location->select('sub_activity_city.id, sub_activity_city.city_id, cities.name, cities.type');
        $builder_location->join('cities', 'cities.id = sub_activity_city.city_id');
        $data_location = $builder_location->where('sub_activity_city.sub_activity_id', $data['sub_activity_id'])->get()->getResultArray();
        if (count($data_location) > 0) {
            $return = array(
                'status' => 'SUCCESS',
                'data_location' => $data_location,
                'location' => $data['location'],
            );
            return $this->response->setJSON($return);
        } else {
            $return = [
                'status' => 'ERROR',
                'message' => 'Data not found'
            ];
            return $this->response->setJSON($return);
        }
    }
    
    public function get_data_location_sub_activities_report2()
    {
        $rid = $_GET['id_subac_report'];
        $builder = $this->db->table('sub_activity_report');
        $builder->select('sub_activity_report.location, sub_activity_report.sub_activity_id');
        $data = $builder->where('sub_activity_report.id', $rid)->get()->getRowArray();
        $builder_location = $this->db->table('cities');
        $builder_location->select('*');
        $data_location = $builder_location->get()->getResultArray();
        if (count($data_location) > 0) {
            $return = array(
                'status' => 'SUCCESS',
                'data_location' => $data_location,
                'location' => $data['location'],
            );
            return $this->response->setJSON($return);
        } else {
            $return = [
                'status' => 'ERROR',
                'message' => 'Data not found'
            ];
            return $this->response->setJSON($return);
        }
    }
    
    public function get_data_achievement_sub_activities_report()
    {
        $sard_id = $_GET['sard_id'];
        $builder = $this->db->table('sub_activity_report_detail');
        $builder->select('sub_activity_report_detail.id, sub_activity_report_detail.achievment, sub_activity_indicator.indicator_id, indicator_target.measures, indicator_target.unit, indicator_target.timeline');
        $builder->join('sub_activity_indicator', 'sub_activity_indicator.id = sub_activity_report_detail.sub_activity_indicator', 'left');
        $builder->join('indicator_target', 'indicator_target.id = sub_activity_indicator.indicator_id', 'left');
        $data = $builder->where('sub_activity_report_detail.id', $sard_id)->get()->getRowArray();
        if ($data) {
            $return = array(
                'status' => 'SUCCESS',
                'milestone' => $data['measures'].' '.$data['unit'].' By '.date_format(date_create($data['timeline']),"F Y"),
                'achievement' => $data['achievment'],
                'sard_id' => $data['id'],
            );
            return $this->response->setJSON($return);
        } else {
            $return = [
                'status' => 'ERROR',
                'message' => 'Data not found'
            ];
            return $this->response->setJSON($return);
        }
    }

    public function ajaxGetLocationBySact()
    {
        // if ($this->request->isAJAX()) {
            $sact_id = $this->request->getGet()['sact'];
            $builder_data_location = $this->db->table('sub_activity_city');
            $builder_data_location->select('cities.id, cities.type, cities.name');
            $builder_data_location->join('cities', 'cities.id = sub_activity_city.city_id');
            $builder_data_location->where('sub_activity_city.sub_activity_id', $sact_id);
            $data_location = $builder_data_location->get()->getResultArray();
            $result = [];
            foreach ($data_location as $key => $value) {
                if ($value['type'] == 'Kabupaten') {
                    $type = 'Kab. ';
                } else {
                    $type = 'Kota ';
                }
                $result[$key] = array(
                    'id' => $value['id'],
                    'text' => $type.$value['name']
                );
            }
            echo json_encode($result);
        // } else {
        //     exit('No direct script access allowed');
        // }
    }
    
    public function ajaxGetLocation()
    {
        // if ($this->request->isAJAX()) {
            $builder_data_location = $this->db->table('cities');
            $builder_data_location->select('cities.id, cities.type, cities.name');
            $data_location = $builder_data_location->get()->getResultArray();
            $result = [];
            foreach ($data_location as $key => $value) {
                if ($value['type'] == 'Kabupaten') {
                    $type = 'Kab. ';
                } else {
                    $type = 'Kota ';
                }
                $result[$key] = array(
                    'id' => $value['id'],
                    'text' => $type.$value['name']
                );
            }
            echo json_encode($result);
        // } else {
        //     exit('No direct script access allowed');
        // }
    }
    
    public function ajaxGetMilestoneBySact()
    {
        if ($this->request->isAJAX()) {
            $sact_id = $this->request->getGet()['sact'];
            $builder_data_milestone = $this->db->table('indicator_target');
            $builder_data_milestone->select('sub_activity_indicator.id, indicator_target.measures, indicator_target.unit, indicator_target.timeline');
            $builder_data_milestone->join('sub_activity_indicator', 'sub_activity_indicator.milestone_id = indicator_target.id');
            $builder_data_milestone->where('sub_activity_indicator.sub_activity_id', $sact_id);
            $data_milestone = $builder_data_milestone->get()->getResultArray();
            $result = [];
            foreach ($data_milestone as $key => $value) {
                $result[$key] = array(
                    'id' => $value['id'],
                    'text' => $value['measures'].' '.$value['unit'].' By '.date_format(date_create($value['timeline']),"F Y"),
                );
            }
            echo json_encode($result);
        } else {
            exit('No direct script access allowed');
        }
    }

    public function ajaxAddReport()
    {
        $this->db->transBegin();
        $data = $this->request->getPost();
        $data_report = array(
            'sub_activity_id' => $data['sact_id'],
            'title' => $data['title'],
            'description' => $data['description'],
            'location' => $data['location'],
            'date' => $data['date'],
            'male' => $data['achievment_male'],
            'female' => $data['achievment_female'],
            'created_at' => date('Y-m-d H:i:s'),
            'created_by' => $data['createdBy'],
            'updated_at' => date('Y-m-d H:i:s'),
            'updated_by' => $data['createdBy'],
        );
        $builder = $this->db->table('sub_activity_report');
        $builder->insert($data_report);
        $id_r = $this->db->insertID();

        if ($fileee = $this->request->getFiles()) {
            $i = 0;
            foreach ($fileee['attachment'] as $filee) {
                if ($filee->isValid() && ! $filee->hasMoved()) {
                    $newName = $data['createdBy'].date('Y_m_d_H_i_s').'_'.$filee->getName();
                    $type_file = $filee->getClientMimeType();
                    $filee->move(FCPATH.'assets/uploads/activity_report_attachment/', $newName);
                    $data_attachment_report = array(
                        'sub_activity_report_id' => $id_r,
                        'attachment' => $newName,
                        'type' => $type_file,
                        'short_description' => $data['short_description'][$i],
                        'created_at' => date('Y-m-d H:i:s'),
                        'created_by' => $data['createdBy'],
                        'updated_at' => date('Y-m-d H:i:s'),
                        'updated_by' => $data['createdBy'],
                    );
                    $builder2 = $this->db->table('sub_activity_report_attachment');
                    $builder2->insert($data_attachment_report);
                }
                $i++;
            }
        }

        foreach ($data['milestone'] as $key => $value) {
            $data_milestone = array(
                'sub_activity_report_id' => $id_r,
                'sub_activity_indicator' => $value,
                // 'achievment' => (int)$data['achievment_male'][$key]+(int)$data['achievment_female'][$key],
                'achievment' => (int)$data['achievment'][$key],
                'created_at' => date('Y-m-d H:i:s'),
                'created_by' => $data['createdBy'],
                'updated_at' => date('Y-m-d H:i:s'),
                'updated_by' => $data['createdBy'],
            );
            $builder_report_milestone = $this->db->table('sub_activity_report_detail');
            $builder_report_milestone->insert($data_milestone);
        }

        $builder_user = $this->db->table('sub_activity_user');
        $builder_user->select('user_id');
        $builder_user->where('sub_activity_id', $data['sact_id']);
        $builder_user->where('user_id !=', $data['createdBy']);
        $data_user = $builder_user->get()->getResultArray();
        foreach ($data_user as $key_user => $value_user) {
            $data_notif = array(
                'sub_activity_id' => $data['sact_id'],
                'sub_activity_report_id' => $id_r,
                'user_id' => $value_user['user_id'],
                'is_readed' => '0',
                'type' => 'report',
                'created_at' => date('Y-m-d H:i:s'),
                'created_by' => $data['createdBy'],
                'updated_at' => date('Y-m-d H:i:s'),
                'updated_by' => $data['createdBy'],
            );
            $builder_notif = $this->db->table('log_notif');
            $builder_notif->insert($data_notif);
        }

        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return json_encode(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return json_encode(array('status' => 'success'));
        }
    }
    
    public function ajaxRevisionAct()
    {
        $this->db->transBegin();
        $data = $this->request->getPost();
        $data_revision = array(
            'title' => $data['title'],
            'description' => $data['description'],
            'start_date' => $data['start_date'],
            'due_date' => $data['due_date'],
            'aproval' => 'pending',
            'status' => '1',
            'updated_at' => date('Y-m-d H:i:s'),
            'updated_by' => $data['createdBy'],
        );
        $builder = $this->db->table('sub_activities');
        $builder->where('id', $data['sact_id']);
        $builder->update($data_revision);

        $builder_delete_city = $this->db->table('sub_activity_city');
        $builder_delete_city->where('sub_activity_id', $data['sact_id']);
        $builder_delete_city->delete();
        foreach ($data['location'] as $key => $value) {
            $data_location = array(
                'sub_activity_id' => $data['sact_id'],
                'city_id' => $value,
                'created_at' => date('Y-m-d H:i:s'),
                'created_by' => $data['createdBy'],
                'updated_at' => date('Y-m-d H:i:s'),
                'updated_by' => $data['createdBy'],
            );
            $builder_insert_city = $this->db->table('sub_activity_city');
            $builder_insert_city->insert($data_location);
        }

        $builder_user = $this->db->table('users');
        $builder_user->select('id');
        $builder_user->where('role_id !=', 4);
        $data_user = $builder_user->get()->getResultArray();
        foreach ($data_user as $key_user => $value_user) {
            $data_notif = array(
                'sub_activity_id' => $data['sact_id'],
                'user_id' => $value_user['id'],
                'is_readed' => '0',
                'type' => 'revision_act',
                'created_at' => date('Y-m-d H:i:s'),
                'created_by' => $data['createdBy'],
                'updated_at' => date('Y-m-d H:i:s'),
                'updated_by' => $data['createdBy'],
            );
            $builder_notif = $this->db->table('log_notif');
            $builder_notif->insert($data_notif);
        }

        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return json_encode(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return json_encode(array('status' => 'success'));
        }
    }
    
    public function ajaxAddReportIniciative()
    {
        $this->db->transBegin();
        $data = $this->request->getPost();
        $data_report = array(
            'sub_activity_id' => 0,
            'title' => $data['title'],
            'description' => $data['description'],
            'location' => $data['location'],
            'date' => $data['date'],
            'male' => $data['male'],
            'female' => $data['female'],
            'status' => 'pending',
            'created_at' => date('Y-m-d H:i:s'),
            'created_by' => $data['createdBy'],
            'updated_at' => date('Y-m-d H:i:s'),
            'updated_by' => $data['createdBy'],
        );
        $builder = $this->db->table('sub_activity_report');
        $builder->insert($data_report);
        $id_r = $this->db->insertID();

        if ($fileee = $this->request->getFiles()) {
            $i = 0;
            foreach ($fileee['attachment'] as $filee) {
                if ($filee->isValid() && ! $filee->hasMoved()) {
                    $newName = $data['createdBy'].date('Y_m_d_H_i_s').'_'.$filee->getName();
                    $type_file = $filee->getClientMimeType();
                    $filee->move(FCPATH.'assets/uploads/activity_report_attachment/', $newName);
                    $data_attachment_report = array(
                        'sub_activity_report_id' => $id_r,
                        'attachment' => $newName,
                        'type' => $type_file,
                        'short_description' => $data['short_description'][$i],
                        'created_at' => date('Y-m-d H:i:s'),
                        'created_by' => $data['createdBy'],
                        'updated_at' => date('Y-m-d H:i:s'),
                        'updated_by' => $data['createdBy'],
                    );
                    $builder2 = $this->db->table('sub_activity_report_attachment');
                    $builder2->insert($data_attachment_report);
                }
                $i++;
            }
        }

        $builder_user = $this->db->table('users');
        $builder_user->select('id');
        $builder_user->where('role_id !=', 4);
        $data_user = $builder_user->get()->getResultArray();
        foreach ($data_user as $key_user => $value_user) {
            $data_notif = array(
                'sub_activity_id' => 0,
                'sub_activity_report_id' => $id_r,
                'user_id' => $value_user['id'],
                'type' => 'initiative_report',
                'created_at' => date('Y-m-d H:i:s'),
                'created_by' => $data['createdBy'],
                'updated_at' => date('Y-m-d H:i:s'),
                'updated_by' => $data['createdBy'],
            );
            $builder_notif = $this->db->table('log_notif');
            $builder_notif->insert($data_notif);
        }

        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return json_encode(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return json_encode(array('status' => 'success'));
        }
    }
    
    public function resubmitReport()
    {
        $this->db->transBegin();
        $data = $this->request->getPost();
        $data_update = array(
            'status' => 'pending',
            'updated_at' => date('Y-m-d H:i:s'),
            'updated_by' => $data['id_user'],
        );
        $builder = $this->db->table('sub_activity_report');
        $builder->where('id', $data['id']);
        $builder->update($data_update);

        $builder_admin = $this->db->table('users');
        $builder_admin->where('role_id !=', 4);
        $data_admin = $builder_admin->get()->getResultArray();

        foreach ($data_admin as $key => $value) {
            $data_notif = array(
                'sub_activity_report_id' => $data['id'],
                'user_id' => $value['id'],
                'type' => 'resubmit_report',
                'created_by' => $data['id_user'],
                'created_at' => date('Y-m-d H:i:s'),
                'updated_by' => $data['id_user'],
                'updated_at' => date('Y-m-d H:i:s'),

            );
            $builder_notif = $this->db->table('log_notif');
            $builder_notif->insert($data_notif);
        }
        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return json_encode(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return json_encode(array('status' => 'success'));
        }
    }
    
    public function delSubAct()
    {
        $this->db->transBegin();

        $data = $this->request->getPost();
        
        $builder2 = $this->db->table('sub_activity_city');
        $builder2->where('sub_activity_id', $data['id']);
        $builder2->delete();
        
        $builder = $this->db->table('sub_activity_user');
        $builder->where('sub_activity_id', $data['id']);
        $builder->delete();

        $builder3 = $this->db->table('log_notif');
        $builder3->where('sub_activity_id', $data['id']);
        $builder3->delete();
        
        $builder4 = $this->db->table('sub_activities');
        $builder4->where('id', $data['id']);
        $builder4->delete();

        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return json_encode(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return json_encode(array('status' => 'success'));
        }
    }

    public function updateReportTitle()
    {
        $this->db->transBegin();
        $data = $this->request->getPost();
        $data_update = array(
            'title' => $data['title_edit'],
            'updated_at' => date('Y-m-d H:i:s'),
            'updated_by' => $data['createdBy'],
        );
        $builder = $this->db->table('sub_activity_report');
        $builder->where('id', $data['sact_report_id']);
        $builder->update($data_update);
        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return json_encode(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return json_encode(array('status' => 'success'));
        }
    }
    
    public function updateReportMaleFemale()
    {
        $this->db->transBegin();
        $data = $this->request->getPost();
        
        $data_update = array(
            'male' => $data['male_edit'],
            'female' => $data['female_edit'],
            'updated_at' => date('Y-m-d H:i:s'),
            'updated_by' => $data['createdBy'],
        );
        $builder = $this->db->table('sub_activity_report');
        $builder->where('id', $data['sact_report_id']);
        $builder->update($data_update);
        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return json_encode(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return json_encode(array('status' => 'success'));
        }
    }
    
    public function updateProfile()
    {
        $this->db->transBegin();
        $data = $this->request->getPost();

        $builder = $this->db->table('users');
        $builder->select('photo');
        $builder->where('id', $data['updatedBy']);
        $data_user = $builder->get()->getRowArray();

        $data_update = array(
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'gender' => $data['gender'],
            'updated_at' => date('Y-m-d H:i:s'),
            'updated_by' => $data['updatedBy'],
        );
        $validationRule = [
            'avatar' => [
                'label' => 'Image File',
                'rules' => [
                    'uploaded[avatar]',
                    'is_image[avatar]',
                    'mime_in[avatar,image/jpg,image/jpeg,image/gif,image/png,image/webp]',
                ],
            ],
        ];
        if ($file = $this->request->getFile('avatar')) {
            if ($this->validateData([], $validationRule)) {
                if ($file->isValid() && ! $file->hasMoved()) {
                    $newName = $data['updatedBy'].date('Y_m_d_H_i_s').'_'.$file->getName();
                    $file->move(FCPATH.'assets/images/avatars/', $newName);
                    $data_update['photo'] = $newName;
                    if ($data_user['photo'] !== 'no_pict.png') {
                        unlink('./assets/images/avatars/'.$data_user['photo']);
                    }
                } else {
                    $data_update['photo'] = $data_user['photo'];
                }
            } else {
                $data_update['photo'] = $data_user['photo'];
            }
        }
        $builder = $this->db->table('users');
        $builder->where('id', $data['updatedBy']);
        $builder->update($data_update);
        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return json_encode(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return json_encode(array('status' => 'success', 'data' => $data_update));
        }
    }
    
    public function updateReportDescription()
    {
        $this->db->transBegin();
        $data = $this->request->getPost();
        $data_update = array(
            'description' => $data['description_edit'],
            'updated_at' => date('Y-m-d H:i:s'),
            'updated_by' => $data['createdBy'],
        );
        $builder = $this->db->table('sub_activity_report');
        $builder->where('id', $data['sact_report_id']);
        $builder->update($data_update);
        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return json_encode(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return json_encode(array('status' => 'success'));
        }
    }
    
    public function updateReportLocation()
    {
        $this->db->transBegin();
        $data = $this->request->getPost();
        $data_update = array(
            'location' => $data['location_edit'],
            'updated_at' => date('Y-m-d H:i:s'),
            'updated_by' => $data['createdBy'],
        );
        $builder = $this->db->table('sub_activity_report');
        $builder->where('id', $data['sact_report_id']);
        $builder->update($data_update);
        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return json_encode(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return json_encode(array('status' => 'success'));
        }
    }
    
    public function updateReportAchievement()
    {
        $this->db->transBegin();
        $data = $this->request->getPost();
        $data_update = array(
            'achievment' => $data['achievement_edit'],
            'updated_at' => date('Y-m-d H:i:s'),
            'updated_by' => $data['createdBy'],
        );
        $builder = $this->db->table('sub_activity_report_detail');
        $builder->where('id', $data['sard_id_edit']);
        $builder->update($data_update);
        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return json_encode(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return json_encode(array('status' => 'success'));
        }
    }
    
    public function addReportAttachment()
    {
        $this->db->transBegin();
        $data = $this->request->getPost();
        if ($fileee = $this->request->getFiles()) {
            foreach ($fileee['attachment'] as $filee) {
                if ($filee->isValid() && ! $filee->hasMoved()) {
                    $newName = $data['createdBy'].date('Y_m_d_H_i_s').'_'.$filee->getName();
                    $type_file = $filee->getClientMimeType();
                    $filee->move(FCPATH.'assets/uploads/activity_report_attachment/', $newName);
                    $data_attachment_report = array(
                        'sub_activity_report_id' => $data['sact_report_id'],
                        'attachment' => $newName,
                        'type' => $type_file,
                        'created_at' => date('Y-m-d H:i:s'),
                        'created_by' => $data['createdBy'],
                        'updated_at' => date('Y-m-d H:i:s'),
                        'updated_by' => $data['createdBy'],
                    );
                    $builder2 = $this->db->table('sub_activity_report_attachment');
                    $builder2->insert($data_attachment_report);
                }
            }
        }
        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return json_encode(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return json_encode(array('status' => 'success'));
        }
    }
    
    public function del_attachment()
    {
        $this->db->transBegin();
        $data = $this->request->getPost();
        $builder = $this->db->table('sub_activity_report_attachment');
        $builder->where('id', $data['id']);
        $builder->delete();
        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return json_encode(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return json_encode(array('status' => 'success'));
        }
    }

    public function getProfile()
    {
        $user_id = $this->request->getGet()['id_user'];
        $builder = $this->db->table('users');
        $builder->where('id', $user_id);
        $result = $builder->get()->getRowArray();
        return $this->response->setJSON($result);
    }

    public function forgetPassword()
    {
        $token = $this->request->getPost('Token');
        $cek_token = $this->cek_token($token);
        if ($cek_token) {
            $email = $this->request->getPost('email');
            $builder_check = $this->db->table('users');
            $builder_check->where('email', $email);
            $cekemail = $builder_check->get()->getNumRows();
            if ($cekemail == 0) {
                return $this->response->setJSON(['status' => 'error',  'message' =>  'Email Tidak Terdaftar']);
            } else {
                $ch = curl_init();
                $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $code = '';
                for ($i = 0; $i < 8; $i++) {
                    $code .= $characters[rand(0, strlen($characters) - 1)];
                }
                $datau = [
                    'password' => md5($code),
                ];
                $builder = $this->db->table('users');
                $builder->where('email', $email);
                if ($builder->update($datau)) {
                    $m = "<h2>Kata Sandi Baru</h2>
                    <p>Mohon untuk tidak memberikan kata sandi ini pada orang lain. Kata Sandi baru kamu adalah</p>
                    <p>" . $code . "</p>
                    <p>Silahkan untuk login dengan kata sandi baru pada website <a href=" . base_url() . ">" . base_url() . "<a> </p>";
                    $dataToSend = [
                        'to_email' => $email,
                        'from_email' => 'admin@simonev.id',
                        'message' => $m,
                    ];
                    $targetUrl = 'https://rdpl.co.id/postmailSimonev/send_mail.php';
                    curl_setopt($ch, CURLOPT_URL, $targetUrl);
                    curl_setopt($ch, CURLOPT_POST, 1);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($dataToSend));
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
                    $response = curl_exec($ch);
                    $result =  json_decode($response, true);
                    if ($result['status'] === 'success') {
                        return $this->response->setJSON(['status' => 'success',  'message' =>  'Silahkan Cek email anda untuk mengambil password baru']);
                    } else {
                        return $this->response->setJSON(['status' => 'error',  'message' =>  $result['message']]);
                    }
                } else {
                    return $this->response->setJSON(['status' => 'error',  'message' =>  "Kirim email password baru gagal"]);
                }
            }
        }else{
            $return = [
                'status' => 'error',
                'message' => 'Unauthorized: Invalid or missing token.'
            ];
            return $this->response->setJSON($return);
        }
    }

    public function changePassword()
    {
        $token = $this->request->getPost('Token');
        $cek_token = $this->cek_token($token);
        if ($cek_token) {
            $password_before = $this->request->getPost('password_before');
            $builder_user = $this->db->table('users');
            $builder_user->where('id', $this->request->getPost('id_user'));
            $user = $builder_user->get()->getRowArray();
            if ($user['password'] == md5($password_before)) {
                if ($this->request->getPost('password') != $this->request->getPost('confirm_password')) {
                    // session()->setFlashdata('error', 'Konfirmasi kata sandi tidak sama');
                    return $this->response->setJSON(['status' => 'error',  'message' =>  'Konfirmasi kata sandi tidak sama']);
                }
                $data = [
                    'password' => md5($this->request->getPost('password')),
                    'updated_by' => $this->request->getPost('id_user'),
                ];
                $builder_user_update = $this->db->table('users');
                $builder_user_update->where('id', $this->request->getPost('id_user'));
                $update = $builder_user_update->update($data);
                return $this->response->setJSON(['status' => 'success',  'message' =>  'Kata sandi berhasil diubah']);
            } else {
                // session()->setFlashdata('error', 'Kata sandi sebelumnya salah');
                return $this->response->setJSON(['status' => 'error',  'message' =>  'Kata sandi sebelumnya salah']);
            }
        } else {
            $return = [
                'status' => 'error',
                'message' => 'Unauthorized: Invalid or missing token.'
            ];
            return $this->response->setJSON($return);
        }
    }

    public function ajaxGetUnreadNotifCount()
    {
        $user_id = $_GET['user_id'];
        $builder_notif = $this->db->table('log_notif');
        $builder_notif->where('user_id', $user_id);
        $builder_notif->where('is_readed !=', '1');
        $notifNum = $builder_notif->get()->getNumRows();
        if ($notifNum > 0) {
            $return = [
                'status' => '200',
                'message' => 'Data found',
                'notifNum' => $notifNum
            ];
            return $this->response->setJSON($return);
        } else {
            $return = [
                'status' => '200',
                'message' => 'Data Empty',
                'notifNum' => 0
            ];
            return $this->response->setJSON($return);
        }
    }
    
    public function getNotif()
    {
        $user_id = $_GET['user_id'];
        // var_dump($user_id);
        // die;
        $builder_notif = $this->db->table('log_notif');
        $builder_notif->where('user_id', $user_id);
        $builder_notif->orderBy('created_at', 'DESC');
        $notif = $builder_notif->get()->getResultArray();
        $array_notif = [];
        if (count($notif) > 0) {
      
             
            foreach ($notif as $key_notif => $value_notif) {
                $builder_user = $this->db->table('users');
                $builder_user->select('name');
                $builder_user->where('id', $value_notif['created_by']);
                $name = $builder_user->get()->getRowArray()['name'];

                $initiative = 'false';

                if ($value_notif['sub_activity_report_id'] !== 0 && $value_notif['sub_activity_report_id'] !== "0") {
                    $builder_title = $this->db->table('sub_activity_report');
                    $builder_title->select('title');
                    $builder_title->where('id', $value_notif['sub_activity_report_id']);
                  
                    if(!empty($builder_title->get()->getRowArray()['title'])){
                        $title = $builder_title->get()->getRowArray()['title'];

                        $builder_initiative = $this->db->table('sub_activity_report');
                        $builder_initiative->select('sub_activity_id');
                        $builder_initiative->where('id', $value_notif['sub_activity_report_id']);
                        $sub_activity_id = $builder_initiative->get()->getRowArray()['sub_activity_id'];

                        if($sub_activity_id == 0){
                            $initiative = 'true';
                        }
                    }else{
                        continue;
                    }


                } else {
                    $builder_title_2 = $this->db->table('sub_activities');
                    $builder_title_2->select('title');
                    $builder_title_2->where('id', $value_notif['sub_activity_id']);
                    $title = $builder_title_2->get()->getRowArray();
                    if(!empty($title)){
                        $title = $title['title'];
                    }else{
                        continue;
                    }
                }
           
                if ($value_notif['type'] == 'report') {
                    $message = $name.' add new report "'.$title.'"';
                } elseif ($value_notif['type'] == 'activity') {
                    $message = $name.' add new activity "'.$title.'"';
                } elseif ($value_notif['type'] == 'comment') {
                    $message = $name.' add new comment on '.$title;
                } elseif ($value_notif['type'] == 'approve_report') {
                    $message = $name.' approved '.$title;
                } elseif ($value_notif['type'] == 'reject_report') {
                    $message = $name.' rejected '.$title;
                } elseif ($value_notif['type'] == 'resubmit_report') {
                    $message = $name.' resubmit report '.'"'.$title.'"';
                } elseif ($value_notif['type'] == 'initiative_report') {
                    $message = $name.' add initiative report '.'"'.$title.'"';
                } elseif ($value_notif['type'] == 'approve_act') {
                    $message = $name.' approve activity '.'"'.$title.'"';
                } elseif ($value_notif['type'] == 'reject_act') {
                    $message = '<b>'.$name.' rejected activity '.'</b>'.'"'.$title.'"';
                } elseif ($value_notif['type'] == 'cancel_approve_act') {
                    $message = '<b>'.$name.' cancel approve activity '.'</b>'.'"'.$title.'"';
                } elseif ($value_notif['type'] == 'cancel_reject_act') {
                    $message = '<b>'.$name.' cancel reject activity '.'</b>'.'"'.$title.'"';
                } elseif ($value_notif['type'] == 'revision_act') {
                    $message = '<b>'.$name.' revise activity '.'</b>'.'"'.$title.'"';
                } elseif ($value_notif['type'] ==  'pending_expenditure') {
                $message = '<b>'.$name.' Add New Activity Expenditure on Activity '.'</b>'.'"'.$title.'"';
                } elseif ($value_notif['type'] ==  'approve_expenditure') {
                $message = '<b>'.$name.' Approve Activity Expenditure on Activity '.'</b>'.'"'.$title.'"';
                } elseif ($value_notif['type'] ==  'reject_expenditure') {
                $message = '<b>'.$name.' Reject Activity Expenditure on Activity '.'</b>'.'"'.$title.'"';
                }
                
                $array_notif[$key_notif] = array(
                    'notif_id' => $value_notif['id'],
                    'sub_activity_id' => $value_notif['sub_activity_id'],
                    'sub_activity_report_id' => $value_notif['sub_activity_report_id'],
                    'created_at' => $value_notif['created_at'],
                    'is_readed' => $value_notif['is_readed'],
                    'message' => $message,
                    'type' => $value_notif['type'],
                    'initiative' => $initiative,
                );
            }
            $return = [
                'status' => '200',
                'message' => 'Data found',
                'notif' => $array_notif
            ];
            return $this->response->setJSON($return);
        } else {
            $return = [
                'status' => '200',
                'message' => 'Data Empty',
                'notif' => $array_notif
            ];
            return $this->response->setJSON($return);
        }
    }

    public function notifReaded()
    {
        $this->db->transBegin();
        $notif_id = $_GET['notif_id'];
        $data_update = array(
            'is_readed' => '1',
            'updated_at' => date('Y-m-d H:i:s'),
        );
        $builder_update_notif = $this->db->table('log_notif');
        $builder_update_notif->where('id', $notif_id);
        $builder_update_notif->update($data_update);
        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return $this->response->setJSON(array('status' => 'error'));
        } else {
            $this->db->transCommit();
            return $this->response->setJSON(array('status' => 'success'));
        }
    }

    public function register()
    {
        $data = $this->request->getPost();
        $builder_check = $this->db->table('users');
        $builder_check->where('email', $data['email']);
        $cekemail = $builder_check->get()->getNumRows();
        if ($cekemail > 0) {
            return $this->response->setJSON(array('status' => 'error', 'message' => 'Email already registered!'));
        } else {
            $this->db->transBegin();
            $data_input = array(
                'email' => $data['email'],
                'phone' => $data['phone'],
                'name' => $data['name'],
                'gender' => $data['gender'],
                'password' => md5($data['password']),
                'role_id' => 4,
                'status' => 0,
                'photo' => 'no_pict.png',
                'created_at' => date('Y-m-d H:i:s')
            );
            $builder = $this->db->table('users');
            $builder->insert($data_input);
            if ($this->db->transStatus() === false) {
                $this->db->transRollback();
                return $this->response->setJSON(array('status' => 'error', 'message' => 'Registration failed, please try again later'));
            } else {
                $this->db->transCommit();
                return $this->response->setJSON(array('status' => 'success', 'message' => 'Registration success, please wait/contact admin for activate your account'));
            }
        }
    }

    public function get_data_location()
    {
        $search = $this->request->getGet('search');
        $builder_location = $this->db->table('cities');
        if ($search !== null && $search!== '') {
            $builder_location->like('name', $search);
        }
        $data_location = $builder_location->get()->getResultArray();
        $result = [];
        foreach ($data_location as $key => $value) {
            if ($value['type'] == 'Kabupaten') {
                $type = 'Kab. ';
            } else {
                $type = $value['type'].' ';
            }
            $result[$key] = array(
                'id' => $value['id'],
                'text' => $type.$value['name']
            );
        }
        echo json_encode($result);
    }

    public function ajaxAddActivityContributor()
    {
        $data = $this->request->getPost();
        // var_dump($data['location']);
        // die;
        $this->db->transBegin();
        $data_insert = array(
            'title' => $data['title'],
            'description' => $data['description'],
            'start_date' => $data['start_date'],
            'due_date' => $data['due_date'],
            'status' => 1,
            'aproval' => 'pending',
            'type' => 'initiative',
            'reff' => 0,
            'created_by' => $data['created_by'],
            'created_at' => date('Y-m-d H:i:s'),
            'updated_by' => $data['created_by'],
            'updated_at' => date('Y-m-d H:i:s'),
        );
        $builder = $this->db->table('sub_activities');
        $builder->insert($data_insert);
        $insert_id = $this->db->insertID();
        foreach ($data['location'] as $key => $value) {
            $data_location = array(
                'sub_activity_id' => $insert_id,
                'city_id' => $value,
                'created_by' => $data['created_by'],
                'created_at' => date('Y-m-d H:i:s'),
                'updated_by' => $data['created_by'],
                'updated_at' => date('Y-m-d H:i:s'),
            );
            $builder_location = $this->db->table('sub_activity_city');
            $builder_location->insert($data_location);
        }
        $data_act_user2 = array(
            'sub_activity_id' => $insert_id,
            'user_id' => $data['created_by'],
            'created_by' => $data['created_by'],
            'created_at' => date('Y-m-d H:i:s'),
            'updated_by' => $data['created_by'],
            'updated_at' => date('Y-m-d H:i:s'),
        );
        $builder_act_user2 = $this->db->table('sub_activity_user');
        $builder_act_user2->insert($data_act_user2);

        $builder_admin = $this->db->table('users');
        $builder_admin->select('id');
        $builder_admin->where('role_id !=', 4);
        $data_admin = $builder_admin->get()->getResultArray();
        foreach ($data_admin as $key_da => $value_da) {
            $data_act_user = array(
                'sub_activity_id' => $insert_id,
                'user_id' => $value_da['id'],
                'created_by' => $data['created_by'],
                'created_at' => date('Y-m-d H:i:s'),
                'updated_by' => $data['created_by'],
                'updated_at' => date('Y-m-d H:i:s'),
            );
            $builder_act_user = $this->db->table('sub_activity_user');
            $builder_act_user->insert($data_act_user);

            $data_notif = array(
                'sub_activity_id' => $insert_id,
                'user_id' => $value_da['id'],
                'is_readed' => '0',
                'type' => 'activity',
                'created_at' => date('Y-m-d H:i:s'),
                'created_by' => $data['created_by'],
                'updated_at' => date('Y-m-d H:i:s'),
                'updated_by' => $data['created_by'],
            );
            $builder_notif = $this->db->table('log_notif');
            $builder_notif->insert($data_notif);
        }
        
        if ($this->db->transStatus() === false) {
            $this->db->transRollback();
            return $this->response->setJSON(array('status' => 'error', 'message' => 'Add activity failed, please try again later'));
        } else {
            $this->db->transCommit();
            return $this->response->setJSON(array('status' => 'success', 'message' => 'Add activity success, please wait/contact admin for validate your activity'));
        }
    }


    public function ajaxGetBudgetExpansive($id){

        $datasub = $this->Sub_activity_model->where('id', $id)->get()->getResultArray();
        if (count($datasub) == 0 || $datasub == null) {
            $return = [
                'status' => 'ERROR',
                'message' => 'User not found'
            ];
            return $this->response->setJSON($return);
        } else {

            $db = \Config\Database::connect();
            $builder_budget_expensive = $db->table('sub_activity_expensive_budget');
            $builder_budget_expensive->select('sub_activity_expensive_budget.*, users.name, users.photo');
            $builder_budget_expensive->join('users','users.id = sub_activity_expensive_budget.created_by','left');
            $builder_budget_expensive->where('sub_activity_expensive_budget.sub_activity_id',$id);
            $budget_expensive = $builder_budget_expensive->get()->getResultArray(); 

            $result = [];
            if(!empty($budget_expensive)){
                $result = $budget_expensive;
            }
           
            $return = [
                'data' => $result,
                'status' => 'SUCCESS',
                'message' => 'data has founded'
            ];
            return $this->response->setJSON($return);
        }
    }

    public function ajaxAddExpenditure(){
        $db      = \Config\Database::connect();
        $data = $this->request->getPost();
        if(!empty($data['type_currency'])){
            if($data['type_currency'] == "rupiah"){
                // $converter = new CurrencyConverter();
                // $budget = $converter->convertIdrToUsd($data['budget']);
                $builder_currency = $db->table('currency_type');
                $builder_currency->select('currency_type.*');
                $builder_currency->where('currency_type.name','USD');
                $currency = $builder_currency->get()->getRowArray();
                $budget = $data['budget']/$currency['value'];
                $budget = number_format($budget, 2);
                $budget_rupiah = $data['budget'];
            }else{
                $budget = $data['budget'];
                $budget_rupiah = 0;
            }
            $type = $data['type_currency'];
        }else{
            $budget = $data['budget'];
            $budget_rupiah = 0;
            $type = 'dollar';
        }
        
        $data_insert = array(
            'sub_activity_id' => $data['expsact_id'],
            'title' => $data['exptitle'],
            'budget' => $budget,
            'budget_rupiah' => $budget_rupiah,
            'type_currency' => $type,
            'description' => $data['expdescription'],
            'date' => $data['expdate'],
            'status' => '0',
            'created_by' =>  $data['expcreatedBy'],
            'created_at' => date('Y-m-d H:i:s'),
            'updated_by' =>  $data['expcreatedBy'],
            'updated_at' => date('Y-m-d H:i:s'),
        );
        $builder2 = $db->table('sub_activity_expensive_budget');
        if($builder2->insert($data_insert)){
           
            
            $builder_user = $this->db->table('sub_activity_user');
            $builder_user->select('user_id');
            $builder_user->join('users','users.id = sub_activity_user.user_id');

            $builder_user->groupStart();
            $builder_user->where('role_id', '1');
            $builder_user->orwhere('role_id', '2');
            $builder_user->groupEnd();
            $builder_user->where('sub_activity_id', $data['expsact_id']);
            $builder_user->where('user_id !=', $data['expcreatedBy']);
          
            $data_user = $builder_user->get()->getResultArray();


            foreach ($data_user as $key_user => $value_user) {
                $data_notif = array(
                    'sub_activity_id' => $data['expsact_id'],
                    'sub_activity_report_id' => '0',
                    'user_id' => $value_user['user_id'],
                    'is_readed' => '0',
                    'type' => 'pending_expenditure',
                    'created_at' => date('Y-m-d H:i:s'),
                    'created_by' => $data['expcreatedBy'],
                    'updated_at' => date('Y-m-d H:i:s'),
                    'updated_by' => $data['expcreatedBy'],
                );
                $builder_notif = $this->db->table('log_notif');
                $builder_notif->insert($data_notif);
            }

        }


        return $this->response->setJSON(['status' => 'SUCCESS', 'message'=> 'Add Activity Expenditure Budget successfull']);
    }
    public function ajaxRevisionExpenditure(){
        $db      = \Config\Database::connect();
        $data = $this->request->getPost();
        if(!empty($data['type_currency'])){
            if($data['type_currency'] == "rupiah"){
                $builder_currency = $db->table('currency_type');
                $builder_currency->select('currency_type.*');
                $builder_currency->where('currency_type.name','USD');
                $currency = $builder_currency->get()->getRowArray();
                $budget = $data['budget']/$currency['value'];
                $budget = number_format($budget, 2);
                $budget_rupiah = $data['budget'];
            }else{
                $budget = $data['budget'];
                $budget_rupiah = 0;
            }
        }else{
            $budget = $data['budget'];
            $budget_rupiah = 0;
        }
        $data_update = array(
            'title' => $data['title'],
            'budget' => $budget,
            'budget_rupiah' => $budget_rupiah,
            'type_currency' => $data['type_currency'],
            'description' => $data['description'],
            'date' => $data['date'],
            'status' => "0",
            'updated_by' => $this->session->get('userdata')['user_id'],
            'updated_at' => date('Y-m-d H:i:s'),
        );
        $builder2 = $db->table('sub_activity_expensive_budget');
        $builder2->set($data_update);
        $builder2->where('id', $data['id']);
        $xx = $builder2->update();

        $builder_user = $this->db->table('sub_activity_user');
        $builder_user->select('user_id');
        $builder_user->join('users','users.id = sub_activity_user.user_id');
        $builder_user->groupStart();
        $builder_user->where('role_id', '1');
        $builder_user->orwhere('role_id', '2');
        $builder_user->groupEnd();
        $builder_user->where('sub_activity_id', $data['expsact_id']);
        $builder_user->where('user_id !=', $data['expcreatedBy']);
        
        $data_user = $builder_user->get()->getResultArray();

        foreach ($data_user as $key_user => $value_user) {
            $data_notif = array(
                'sub_activity_id' => $data['expsact_id'],
                'sub_activity_report_id' => '0',
                'user_id' => $value_user['user_id'],
                'is_readed' => '0',
                'type' => 'pending_expenditure',
                'created_at' => date('Y-m-d H:i:s'),
                'created_by' => $data['expcreatedBy'],
                'updated_at' => date('Y-m-d H:i:s'),
                'updated_by' => $data['expcreatedBy'],
            );
            $builder_notif = $this->db->table('log_notif');
            $builder_notif->insert($data_notif);
        }
        return $this->response->setJSON(['status' => 'SUCCESS', 'message'=> 'Revision Activity Expenditure Budget successfull']);
    }

}
