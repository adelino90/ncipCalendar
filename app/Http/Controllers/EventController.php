<?php

namespace App\Http\Controllers;

use App\Models\EventModel;
use App\Models\EventTypeModel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class EventController extends Controller
{
    public function saveEvent(Request $request)
    {
       
        $eventData = [
                    'eventName' => $request->input('text'),
                    'eventDateFrom' => $request->input('dayFrom'),
                    'eventDateTo' => $request->input('dayTo'),
                    'eventTypeId' => $request->input('eventTypeId'),
                    'eventDetails' => $request->input('eventDetails'),
                    'eventNotificationSchedule' => $request->input('eventNotificationSchedule'),
                    'eventZoomLink' => $request->input('eventZoomLink'),
                    'userUuid' =>  Auth::user()->userUuid,
                    'officeId' => Auth::user()->officeId
                    ];

        $createEvent = EventModel::create($eventData);
        return $createEvent;
    }

    // Test delete controller method
    public function deleteEvent(Request $request)
    {
        $deleteEvent = EventModel::where('eventId', $request->input('eventId')) -> delete();
        return $deleteEvent;
    }

    public function retrieveEvent(Request $request)
    {
        $dataEvent = EventModel::where('eventId', $request->input('eventId')) -> first();
        return $dataEvent;
    }


    public function getAllEvents(Request $request){

        $userUuid = Auth::user()->userUuid;
        $officeId = Auth::user()->officeId;

        $data =  EventModel::select(['eventId as id','eventName as title', 'eventDateFrom as start','eventDateTo as end'])->where(['userUuid' => $userUuid,'officeId' => $officeId])
        ->orWhere(['eventTypeId' => 39])
        -> get();
        return $data;
        
    }

    public function getAllEventTypes(Request $request){
        $data = EventTypeModel::get();
        return $data;
    }

    // public function getEventType(Request $request){

    //     $data = EventTypeModel::where('eventTypeId', $request->input('eventTypeId'))->first()['eventTypeName'];

    //     return $data;
    // }

    public function getFilterEventTypes(Request $request) {

        $eventType = EventTypeModel::where('eventTypeId', $request->input('eventTypeId'))->first()['eventTypeName'];
        
        $userUuid = Auth::user()->userUuid;
        $officeId = Auth::user()->officeId;
         
        
        if ($eventType == 'Personal'){
            
            $data =  EventModel::select(['eventId as id','eventName as title', 'eventDateFrom as start','eventDateTo as end', 'eventTypeId'])->where(['eventTypeId' => $request->input('eventTypeId'), 'userUuid' => $userUuid]) -> get();

            
            return $data;

        } 
        else if ($eventType == 'Internal'){
            
            $data =  EventModel::select(['eventId as id','eventName as title', 'eventDateFrom as start','eventDateTo as end', 'eventTypeId'])->where(['eventTypeId' => $request->input('eventTypeId'), 'officeId' => $officeId]) -> get();
            
            return $data;

        } 
        
        else if ($eventType == 'Agency Wide'){
            
            $data =  EventModel::select(['eventId as id','eventName as title', 'eventDateFrom as start','eventDateTo as end', 'eventTypeId'])->where(['eventTypeId' => $request->input('eventTypeId')]) -> get();

          
            return $data;

        } 
        
        else if ($eventType == 'Others'){
            
            $data =  EventModel::select(['eventId as id','eventName as title', 'eventDateFrom as start','eventDateTo as end', 'eventTypeId'])->where(['eventTypeId' => $request->input('eventTypeId')]) -> get();

            return $data;

        } 

    }
}





