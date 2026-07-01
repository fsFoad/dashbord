import { Injectable, Signal } from '@angular/core';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { ModuleDto } from '../models/Module.Dto';
import { ClientDto } from '../models/client.Dto';
import { ConditionDto } from '../models/condition.Dto';
import { EndpointheaderDto } from '../models/endpointheader.Dto';
import { PartyDto } from '../models/party.Dto';
import { RouleDto } from '../models/roule.Dto';
import { ConnectionService, SKIP_EMPTY_CHECK } from '../../../../shared/repositories/connection.service';
import { CacheDto } from '../models/cache.Dto';
import { toObservable } from '@angular/core/rxjs-interop';
import { HttpContext, HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})
export class MessagesApiFacadeService {
    constructor(
        private connectionService: ConnectionService,
    ) {
    }


/*    messagesearchNottIsSystem(code?, title?, tableid?, type?, messageid?, pagesize?, pageno?,issystemmessage?): Observable<any> {
        return this.connectionService.getConnection('message/messagesearch?' +
            (code ? 'code=' + code : '') +
            ((code && title) ? '&title=' + title : (title ? 'title=' + title : '')) +
            ((code || title) && tableid ? '&tableid=' + tableid : (tableid ? 'tableid=' + tableid : '')) +
            (((code || title || tableid) && type) ? '&type=' + type : (type ? 'type=' + type : '')) +
            (((code || title || tableid || type) && messageid) ? '&messageid=' + messageid : (messageid ? 'messageid=' + messageid : '')) +
            (((code || title || tableid || type||messageid) && pagesize ) ? '&pagesize=' + pagesize : (pagesize ? 'pagesize=' + pagesize : '')) +
            (((code || title || tableid || type||messageid||pagesize) && (pageno||pageno==0)  ) ? '&pageno=' + pageno : ((pageno||pageno==0) ? 'pageno=' + pageno : '')) +
            (((code || title || tableid || type||messageid||pagesize||pageno) && issystemmessage||issystemmessage==0  ) ? '&issystemmessage=' + issystemmessage : (issystemmessage ? 'issystemmessage=' + issystemmessage : '')) +
            '', 'messagesearch',{observe:'response'})
    }*/
    messagesearchNottIsSystem(code?: any, title?: any, tableid?: any, type?: any, messageid?: any, pagesize?: any, pageno?: any, issystemmessage?: any): Observable<any> {
        let params = new HttpParams();
        if (code) params = params.set('code', code);
        if (title) params = params.set('title', title);
        if (tableid !== undefined&&tableid !== null) params = params.set('tableid', tableid.toString());
        if (type !== undefined&&type !== null) params = params.set('type', type.toString());
        if (messageid !== undefined&&messageid !== null) params = params.set('messageid', messageid.toString());
        if (pagesize !== undefined&&pagesize !== null) params = params.set('pagesize', pagesize.toString());
        if (pageno !== undefined&&pageno !== null) params = params.set('pageno', pageno.toString());
        if (issystemmessage !== undefined&&issystemmessage !== null) {
            params = params.set('issystemmessage', issystemmessage.toString());
        }

        return this.connectionService.getConnection(
            'message/messagesearch',
            '',
            { observe: 'response', params }
        );
    }
/*    messagesearchIsSystem(code?, title?, tableid?, type?, messageid?, pagesize?, pageno?,issystemmessage?): Observable<any> {
        return this.connectionService.getConnection('message/messagesearch?' +
            (code ? 'code=' + code : '') +
            ((code && title) ? '&title=' + title : (title ? 'title=' + title : '')) +
            ((code || title) && tableid ? '&tableid=' + tableid : (tableid ? 'tableid=' + tableid : '')) +
            (((code || title || tableid) && type) ? '&type=' + type : (type ? 'type=' + type : '')) +
            (((code || title || tableid || type) && messageid) ? '&messageid=' + messageid : (messageid ? 'messageid=' + messageid : '')) +
            (((code || title || tableid || type||messageid) && pagesize ) ? '&pagesize=' + pagesize : (pagesize ? 'pagesize=' + pagesize : '')) +
            (((code || title || tableid || type||messageid||pagesize) && (pageno||pageno==0)  ) ? '&pageno=' + pageno : ((pageno||pageno==0) ? 'pageno=' + pageno : '')) +
            (((code || title || tableid || type||messageid||pagesize||pageno) && issystemmessage  ) ? '&issystemmessage=' + issystemmessage : (issystemmessage ? 'issystemmessage=' + issystemmessage : '')) +
            '', 'messagesearch',{observe:'response'})
    }*/
    messagesearchIsSystem(code?: any, title?: any, tableid?: any, type?: any, messageid?: any, pagesize?: any, pageno?: any, issystemmessage?: any): Observable<any> {

        let params = new HttpParams();

        if (code) params = params.set('code', code);
        if (title) params = params.set('title', title);
        if (tableid !== undefined&&tableid !== null) params = params.set('tableid', tableid.toString());
        if (type !== undefined&&type !== null) params = params.set('type', type.toString());
        if (messageid !== undefined&&messageid !== null) params = params.set('messageid', messageid.toString());
        if (pagesize !== undefined&&pagesize !== null) params = params.set('pagesize', pagesize.toString());
        if (pageno !== undefined&&pageno !== null) params = params.set('pageno', pageno.toString());
        if (issystemmessage !== undefined&&issystemmessage !== null) {
            params = params.set('issystemmessage', issystemmessage.toString());
        }

        return this.connectionService.getConnection(
            'message/messagesearch',
            '',
            { observe: 'response', params }
        );
    }
/*    getMessages(code?, title?, tableid?, type?, messageid?, pagesize?, pageno?,issystemmessage?): Observable<any> {
        debugger
        return this.connectionService.getConnection('message/messagesearch?' +
            (code ? 'code=' + code : '') +
            ((code && title) ? '&title=' + title : (title ? 'title=' + title : '')) +
            ((code || title) && tableid ? '&tableid=' + tableid : (tableid ? 'tableid=' + tableid : '')) +
            (((code || title || tableid) && type) ? '&type=' + type : (type ? 'type=' + type : '')) +
            (((code || title || tableid || type) && messageid) ? '&messageid=' + messageid : (messageid ? 'messageid=' + messageid : '')) +
            (((code || title || tableid || type||messageid) && pagesize ) ? '&pagesize=' + pagesize : (pagesize ? 'pagesize=' + pagesize : '')) +
            (((code || title || tableid || type||messageid||pagesize) && (pageno||pageno==0)  ) ? '&pageno=' + pageno : ((pageno||pageno==0) ? 'pageno=' + pageno : '')) +
            (((code || title || tableid || type||messageid||pagesize||pageno) && issystemmessage||issystemmessage==0  ) ? '&issystemmessage=' + issystemmessage : (issystemmessage ? 'issystemmessage=' + issystemmessage : '')) +
            '', 'messagesearch',{observe:'response'})
    }*/
    getMessages(code?:any, title?, tableid?: any, type?: any, messageid?: any, pagesize?: any, pageno?: any, issystemmessage?: any): Observable<any> {

        let params = new HttpParams();

        if (code) params = params.set('code', code);
        if (title) params = params.set('title', title);
        if (tableid !== undefined&&tableid !== null) params = params.set('tableid', tableid.toString());
        if (type !== undefined&&type !== null) params = params.set('type', type.toString());
        if (messageid !== undefined&&messageid !== null) params = params.set('messageid', messageid.toString());
        if (pagesize !== undefined&&pagesize !== null) params = params.set('pagesize', pagesize.toString());
        if (pageno !== undefined&&pageno !== null) params = params.set('pageno', pageno.toString());
        if (issystemmessage !== undefined&&issystemmessage !== null) {
            params = params.set('issystemmessage', issystemmessage.toString());
        }

        return this.connectionService.getConnection(
            'message/messagesearch',
            '',
            { observe: 'response', params }
        );
    }
    /*  messagesearch(code?, title?, tableid?, type?, messageid?, pagesize?, pageno?,issystemmessage?): Observable<any> {
        debugger
        return this.connectionService.getConnection('message/messagesearch?' +
            (code ? 'code=' + code : '') +
            ((code && title) ? '&title=' + title : (title ? 'title=' + title : '')) +
            ((code || title) && tableid ? '&tableid=' + tableid : (tableid ? 'tableid=' + tableid : '')) +
            (((code || title || tableid) && type) ? '&type=' + type : (type ? 'type=' + type : '')) +
            (((code || title || tableid || type) && messageid) ? '&messageid=' + messageid : (messageid ? 'messageid=' + messageid : '')) +
            (((code || title || tableid || type||messageid) && pagesize ) ? '&pagesize=' + pagesize : (pagesize ? 'pagesize=' + pagesize : '')) +
            (((code || title || tableid || type||messageid||pagesize) && (pageno||pageno==0)  ) ? '&pageno=' + pageno : ((pageno||pageno==0) ? 'pageno=' + pageno : '')) +
            (((code || title || tableid || type||messageid||pagesize||pageno) && issystemmessage||issystemmessage==0  ) ? '&issystemmessage=' + issystemmessage : (issystemmessage ? 'issystemmessage=' + issystemmessage : '')) +
            '', 'messagesearch')
    }*/
   /* searchhub(pageno ,pagesize,dbname,ip,title): Observable<any> {
        return this.connectionService.getConnection('datahub/searchhub?' +
            'pageno=' + pageno + '&pagesize=' + pagesize+
            (dbname ? '&dbname=' + dbname : '') +
            (ip? '&ip=' + ip : '')+
            (title? '&title=' + title : '') +
            '', '',{observe:'response'})
    }*/
    searchhub(pageno: any, pagesize: any, dbname?: any, ip?: any, title?: any): Observable<any> {
        let params = new HttpParams()
            .set('pageno', pageno.toString())
            .set('pagesize', pagesize.toString());

        if (dbname) params = params.set('dbname', dbname);
        if (ip) params = params.set('ip', ip);
        if (title) params = params.set('title', title);

        return this.connectionService.getConnection(
            'datahub/searchhub',
            '',
            { observe: 'response', params }
        );
    }
/*    getpartyinfo(pageno, pagesize, name?) {
        debugger
        return this.connectionService.getConnection('party/getpartyinfo?'+
            (name  ?
                'name=' + name+ '&pageno=' + pageno +'&pagesize=' + pagesize :
                'pageno=' + pageno + '&pagesize=' + pagesize)
            , '',{observe:'response'});
    }*/
    getpartyinfo(pageno: any, pagesize: any, name?: any): Observable<any> {
        let params = new HttpParams()
            .set('pageno', pageno.toString())
            .set('pagesize', pagesize.toString());

        if (name) {
            params = params.set('name', name);
        }

        return this.connectionService.getConnection(
            'party/getpartyinfo',
            '',
            { observe: 'response', params }
        );
    }
    /* getReceiver(pageno ,pagesize,name?,mobileNo? ) {
         debugger
         return this.connectionService.getConnection('alarm/receiver?' +'pageno='+pageno +'&pagesize='+pagesize+
             (name ? '&name=' + name : '') +
             (mobileNo ? '&mobileNo=' + mobileNo : '') , '',{observe:'response'});
     }
 */
    getReceiver(pageno: number, pagesize: number, name?: any, mobileNo?: any) {
        let params = new HttpParams()
            .set('pageno', pageno)
            .set('pagesize', pagesize);

        if (name) params = params.set('name', name);
        if (mobileNo) params = params.set('mobileNo', mobileNo);

        return this.connectionService.getConnection(
            'alarm/receiver',
            '',
            { observe: 'response', params }
        );
    }
/*    getSectionReceiver(pageno ,pagesize ) {
        debugger
        return this.connectionService.getConnection('alarm/section_receiver?' +'pageno='+pageno +'&pagesize='+pagesize, '',   { observe: 'response' });
    }*/
    getSectionReceiver(pageno: any, pagesize: any): Observable<any> {

        const params = new HttpParams()
            .set('pageno', pageno.toString())
            .set('pagesize', pagesize.toString());

        return this.connectionService.getConnection(
            'alarm/section_receiver',
            '',
            { observe: 'response', params }
        );
    }
   /* modulesearchbypartyid(pageno, pagesize, partyid) {
        return this.connectionService.getConnection('module/searchbypartyid?'+
            'partyid=' + partyid + '&pageno=' + pageno +'&pagesize=' + pagesize
            , '');
    }*/
    modulesearchbypartyid(pageno: number, pagesize: number, partyid: number): Observable<any> {

        const params = new HttpParams()
            .set('partyid', partyid.toString())
            .set('pageno', pageno.toString())
            .set('pagesize', pagesize.toString());
        return this.connectionService.getConnection('module/searchbypartyid', '',    { observe: 'response', params }
        );
    }
/*    apibymoduleinfo(moduleid: number, pageno: number, pagesize: number,
                    apiName?: string, apiTitle?: string) {
        return this.connectionService.getConnection('api/apibymoduleinfo?'
            + 'moduleid=' + moduleid +
            ((moduleid && apiName) ? '&apiname=' + apiName : '') +
            ((moduleid && apiTitle) ? '&apititle=' + apiTitle : '') +
            '&pageno=' + pageno + '&pagesize=' + pagesize, '');
    }*/
    apibymoduleinfo(moduleid: number, pageno: number, pagesize: number, apiName?: string, apiTitle?: string) {
        let params = new URLSearchParams({
            moduleid: moduleid.toString(),
            pageno: pageno.toString(),
            pagesize: pagesize.toString(),
        });
        if (apiName) {
            params.append('apiname', apiName);
        }
        if (apiTitle) {
            params.append('apititle', apiTitle);
        }
        return this.connectionService.getConnection(
            `api/apibymoduleinfo?${params.toString()}`,
            '', { observe: 'response'}
        );
    }
    validateInputMediatorElement(apiid: number) {
        let params = new HttpParams().set('apiid', apiid);

        return this.connectionService.postConnection(
            'mediator/inputmediatorelement/validate',
            null,
            undefined,
            { observe: 'response', params },
        );
    }
   /* endpointdetailByApi(apiId: number) {
        return this.connectionService.getConnection('endpointdetail/getbyapiid/' + apiId, '')
    }*/
    endpointdetailByApi(apiId: number, pageno: number, pagesize: number,issystem?: number,
                        options?:
                        {
                            skipEmptyCheck?: boolean;
                        }
    ) {
        let params = new HttpParams()
            .set('pageno', pageno.toString())
            .set('pagesize', pagesize.toString());
        if (issystem !== undefined && issystem !== null) {
            params = params.set('issystem', issystem.toString());
        }
        return this.connectionService.getConnection(
            `endpointdetail/getbyapiid/${apiId}`,
            undefined,
            { observe: 'response', params,
                context: new HttpContext().set(
                    SKIP_EMPTY_CHECK,
                    options?.skipEmptyCheck ?? false
                )
              }
        );
    }
    getinputmediatorelement(apiid: number,pageno: number, pagesize: number){
        let params = new HttpParams()
            .set('pageno', pageno.toString())
            .set('pagesize', pagesize.toString());
        return this.connectionService.getConnection(`mediator/inputmediatorelement/${apiid}`,
            'inputmediatorelementList',  { observe: 'response', params }
        );
    }
    getInputMediatorElementDetail(
        apiid: number,
        groupid: number
    ) {
        return this.connectionService.getConnection(
            `mediator/v2/inputmediatorelementdetail/${apiid}/${groupid}`,
            'inputmediatorelementdetailList',
            { observe: 'response' }
        );
    }
    saveMediator(body: any): Observable<any> {
        return this.connectionService.postConnection(
            'mediator/inputmediatorelement/register',
            body,
            undefined,
            { observe: 'response' }
        );
    }
    /*    clientbyapiid(apiid) {
        return this.connectionService.getConnection('client/clientbyapiid/' +
            apiid, '')
    }*/
    clientbyapiid(
        apiid: any,
        pagesize: number,
        pageno: number
    ) {
        let params = new HttpParams()
            .set('pageno', pageno.toString())
            .set('pagesize', pagesize.toString());
        return this.connectionService.getConnection(`client/clientbyapiid/${apiid}`,
            '',  { observe: 'response', params }
        );
    }
    apiNochart(pageno ,pagesize,moduleid) {
        debugger
        return this.connectionService.getConnection('api/apibymoduleinfo/nochart?' +
            'pageno=' + pageno + '&pagesize=' + pagesize+ (moduleid ? '&moduleid=' + moduleid : '') +
            '');
    }
    moduleSearchByPartyId(partyId: number) {
        return this.connectionService.getConnection('module/searchbypartyid/v2/?partyid='
            + partyId,
            'moduleSearchByPartyId');
    }
    /*  getbyendpointid(endpoinid: string) {
        return this.connectionService.getConnection('endpointdetail/getbyendpointid/'
            + endpoinid,
            '');
    }*/
/*    getbyendpointid(endpointId: number, pagesize?: number, pageno?: number): Observable<any> {
        let params = new HttpParams();
        if (pagesize !== undefined && pagesize !== null) {
            params = params.set('pagesize', pagesize.toString());
        }
        if (pageno !== undefined && pageno !== null) {
            params = params.set('pageno', pageno.toString());
        }
        return this.connectionService.getConnection(
            'endpointdetail/getbyendpointid/'+ endpointId,
            '',
            { observe: 'response', params }
        );
    }*/
    getByEndpointIdIssystem(endpointId: number,  pagesize?: number, pageno?: number): Observable<any> {
        let params = new HttpParams();
        params = params.set('issystem', '1');
        if (pagesize !== undefined && pagesize !== null) {
            params = params.set('pagesize', pagesize.toString());
        }
        if (pageno !== undefined && pageno !== null) {
            params = params.set('pageno', pageno.toString());
        }
        return this.connectionService.getConnection(
            'endpointdetail/getbyendpointid/'+ endpointId,
            '',
            { observe: 'response', params }
        );
    }
    getByEndpointIdNotIssystem(endpointId: number,  pagesize?: number, pageno?: number): Observable<any> {

        let params = new HttpParams();
        params = params.set('issystem', '0');
        if (pagesize !== undefined && pagesize !== null) {
            params = params.set('pagesize', pagesize.toString());
        }
        if (pageno !== undefined && pageno !== null) {
            params = params.set('pageno', pageno.toString());
        }
        return this.connectionService.getConnection(
            'endpointdetail/getbyendpointid/'+ endpointId,
            '',
            { observe: 'response', params }
        );
    }
/*    endpointbymoduleid(moduleId: number) {
        return this.connectionService.getConnection('endpoint/endpointbymoduleid/'
            + moduleId,
            'endpointbymoduleid', { observe: 'response'});
    }*/
    endpointbymoduleid(
        moduleId: number,
        pagesize?: number,
        pageno?: number
    ): Observable<any> {

        let params = new HttpParams();

        if (pagesize !== undefined && pagesize !== null) {
            params = params.set('pagesize', pagesize.toString());
        }

        if (pageno !== undefined && pageno !== null) {
            params = params.set('pageno', pageno.toString());
        }

        return this.connectionService.getConnection(
            'endpoint/endpointbymoduleid/' + moduleId,
            'endpointbymoduleid',
            {
                observe: 'response',
                params
            }
        );
    }
    getAggregateCards(
        apiid: number,
        pagesize?: number,
        pageno?: number
    ): Observable<any> {

        let params = new HttpParams();

        if (pagesize !== undefined && pagesize !== null) {
            params = params.set('pagesize', pagesize.toString());
        }

        if (pageno !== undefined && pageno !== null) {
            params = params.set('pageno', pageno.toString());
        }

        return this.connectionService.getConnection(
            `aggregate/card/${apiid}`,
            'getAggregateCards',
            {
                observe: 'response',
                params
            }
        );
    }
    getAggregate(
        aggregateid : number,
    ): Observable<any> {

        return this.connectionService.getConnection(
            `aggregate/${aggregateid }`,
            'aggregate',
            {
                observe: 'response',
            }
        );
    }
    registerAggregate(body: any): Observable<any> {
        return this.connectionService.postConnection(
            `aggregate`,
            body,
            undefined,
            {
                observe: 'response',
            },
        );
    }
    updateAggregate(aggregateid,body: any): Observable<any> {
        return this.connectionService.putConnection(
            `aggregate/${aggregateid }`,
            body,
            undefined,
            {
                observe: 'response',
            },
        );
    }
    deleteAggregate(aggregateid): Observable<any> {
        return this.connectionService.deleteConnection(
            `aggregate/${aggregateid }`,

            undefined,
            {
                observe: 'response',
            },
        );
    }
    getSection(pageno ,pagesize,title?,   options?:
    {
        skipEmptyCheck?: boolean;
    } ) {
        debugger
        return this.connectionService.getConnection('alarm/section?' +'pageno='+pageno +'&pagesize='+pagesize+
            (title ? '&title=' + title : '') , '');
    }
    getAlarm(pageno ,pagesize ,destionationAddress?,fromdate?,todate?) {
        debugger
        return this.connectionService.getConnection('alarm?' +'pageno='+pageno +'&pagesize='+pagesize+
            (fromdate ? '&fromdate=' + fromdate : '') +
            (todate ? '&todate=' + todate : '') +
            (destionationAddress ? '&destination_address=' + destionationAddress : '') ,  '');
    }
    /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/





    reportLog(download,pageno: number, pagesize: number,fromdate, todate, clientid?,partyid?,moduleid?,apiid?): Observable<any> {
        return this.connectionService.getConnection('requestlog/report?' +
            (fromdate ? 'fromdate=' + fromdate : '') +
            ((fromdate && todate) ? '&todate=' + todate : (todate ? 'todate=' + todate : '')) +
            ((fromdate || todate) && clientid ? '&clientid=' + clientid : (clientid ? 'clientid=' + clientid : '')) +
            ((fromdate || todate||clientid) && partyid ? '&partyid=' + partyid : (partyid ? 'partyid=' + partyid : '')) +
            ((fromdate || todate||clientid||partyid) && moduleid ? '&moduleid=' + moduleid : (moduleid ? 'moduleid=' + moduleid : '')) +
            ((fromdate || todate||clientid||partyid||moduleid) && pageno!=null&&pageno!=undefined ? '&pageno=' + pageno : (pageno!=null&&pageno!=undefined ? 'pageno=' + pageno : '')) +
            ((fromdate || todate||clientid||partyid||moduleid||pageno) && pagesize!=null&&pagesize!=undefined ? '&pagesize=' + pagesize : (pagesize!=null&&pagesize!=undefined ? 'pagesize=' + pagesize : '')) +
            ((fromdate || todate||clientid||partyid||moduleid||pageno||pagesize) && download!=null&&download!=undefined ? '&download=' + download : (download!=null&&download!=undefined ? 'download=' + download : ''))+
            ((fromdate || todate||clientid||partyid||moduleid||pageno||pagesize||download) && apiid!=null&&apiid!=undefined ? '&apiid=' + apiid : (apiid!=null&&apiid!=undefined ? 'apiid=' + apiid : '')) +
            '', 'reportLog')

    }
    /* downloadReportLog(pageno: number, pagesize: number,fromdate, todate, clientid?,partyid?,moduleid?,apiid?): Observable<any> {
         let a= this.connectionService.getDownloadConnection('requestlog/report?' +'&download=1&'+
            (fromdate ? 'fromdate=' + fromdate : '') +
             ((fromdate && todate) ? '&todate=' + todate : (todate ? 'todate=' + todate : '')) +
             ((fromdate || todate) && clientid ? '&clientid=' + clientid : (clientid ? 'clientid=' + clientid : '')) +
             ((fromdate || todate||clientid) && partyid ? '&partyid=' + partyid : (partyid ? 'partyid=' + partyid : '')) +
             ((fromdate || todate||clientid||partyid) && moduleid ? '&moduleid=' + moduleid : (moduleid ? 'moduleid=' + moduleid : '')) +
             ((fromdate || todate||clientid||partyid||moduleid) && pageno!=null&&pageno!=undefined ? '&pageno=' + pageno : (pageno!=null&&pageno!=undefined ? 'pageno=' + pageno : '')) +
             ((fromdate || todate||clientid||partyid||moduleid||pageno) && pagesize!=null&&pagesize!=undefined ? '&pagesize=' + pagesize : (pagesize!=null&&pagesize!=undefined ? 'pagesize=' + pagesize : '')) +
             ((fromdate || todate||clientid||partyid||moduleid||pageno) && apiid!=null&&apiid!=undefined ? '&apiid=' + apiid : (apiid!=null&&apiid!=undefined ? 'apiid=' + apiid : '')) +
              +'', 'reportLog')
         debugger
         return a
     }*/
    searchbytitlemodule(pageno, pagesize, title?) {
        return this.connectionService.getConnection('module/searchbytitle?'+
            (title  ? 'pageno=' + pageno +'&pagesize=' + pagesize+'&title=' + title :
                'pageno=' + pageno + '&pagesize=' + pagesize)
            , '', );
    }

    downloadReportLog(pageno: number, pagesize: number, fromdate, todate, clientid?, partyid?, moduleid?, apiid?): Observable<any> {
        const queryParams = new URLSearchParams();

        if (fromdate) queryParams.append('fromdate', fromdate.toString());
        if (todate) queryParams.append('todate', todate.toString());
        if (clientid) queryParams.append('clientid', clientid.toString());
        if (partyid) queryParams.append('partyid', partyid.toString());
        if (moduleid) queryParams.append('moduleid', moduleid.toString());
        if (pageno != null) queryParams.append('pageno', pageno.toString());
        if (pagesize != null) queryParams.append('pagesize', pagesize.toString());
        if (apiid != null) queryParams.append('apiid', apiid.toString());

        queryParams.append('download', '1');

        const fullUrl = `requestlog/report?${queryParams.toString()}`;

        return this.connectionService.getDownloadConnection(fullUrl, 'reportLog');
    }

    detailReportLog(requestlogid: number,clientid:number,apiid:number,logged_date:string,): Observable<any> {
        return this.connectionService.getConnection('requestlog/report/detail?' +
            (requestlogid ? 'requestlogid=' + requestlogid : '') +'&clientid=' + clientid+'&apiid=' + apiid+ '&logged_date='+logged_date+
            '', 'detailReportLog')

    }

    registerMessage(messagesDto: any) {
        return this.connectionService.postConnection('message/register', messagesDto,
            '', 'registerMessage');
    }

    moduleSearchByTitle(title: any) {
        return this.connectionService.getConnection('module/searchbytitle/'
            + title,
            'moduleSearchByTitle');
    }

    modulegetall() {
        return this.connectionService.getConnection('module/modulegetall/'
            ,
            'modulegetall');
    }






    fetchallmodule() {
        return this.connectionService.getConnection('module/fetchallmodule/'
            ,
            'fetchallmodule');
    }



    SearchModuleById(moduleId: number) {
        return this.connectionService.getConnection('module/searchmodulebyid/' +
            +moduleId,
            'SearchModuleById');
    }

    registerModule(moduleDto: ModuleDto) {
        return this.connectionService.postConnection('module/register', moduleDto,
            'registerModule');
    }

    partygetall() {
        return this.connectionService.getConnection('party/partygetall/'
            ,
            'partygetall');
    }

    fetchallparty() {
        return this.connectionService.getConnection('party/fetchallparty/'
            , 'fetchallparty');
    }

    partySearchByName(name: string) {
        return this.connectionService.getConnection('party/searchbyname/'
            + name,
            'partySearchByName');
    }

    quickaccess(partyid, moduleid, clientid?): Observable<any> {
        return this.connectionService.getConnection('party/quickaccess' +
            (partyid ? '?partyid=' + partyid : '') +
            ((partyid && moduleid) ? '&moduleid=' + moduleid : (moduleid ? '?moduleid=' + moduleid : '')) +
            ((partyid || moduleid) && clientid ? '&clientid=' + clientid :
                (clientid ? '?clientid=' + clientid : '')) +
            '', 'quickaccess')
    }

    endpointbyid(endpoinid: number) {
        return this.connectionService.getConnection('endpoint/endpointbyid/'
            + endpoinid,
            '');
    }

    registerEndpoint(endpoint) {
        return this.connectionService.postConnection('endpoint/register', endpoint,
            'registerEndpoint');
    }

    updateEndpoint(endpoint) {
        return this.connectionService.postConnection('endpoint/update', endpoint,
            'updateEndpoint');
    }

    endpointgetall() {
        return this.connectionService.getConnection('endpoint/endpointgetall'
            ,
            '');
    }



    endpointbyclientid(clientId: number) {
        return this.connectionService.getConnection('endpoint/endpointbyclientid/'
            + clientId,
            'endpointbyclientid');
    }

    registerParty(partyDto: PartyDto) {
        return this.connectionService.postConnection('party/register', partyDto,
            'registerParty');
    }

    clientgetbyendpointid(endpoinid: number) {
        return this.connectionService.getConnection('client/clientgetbyendpointid/'
            + endpoinid,
            'clientgetbyendpointid');
    }

    clientgetall() {
        return this.connectionService.getConnection('client/clientgetall',
            'clientgetall');
    }

    fetchallclient() {
        return this.connectionService.getConnection('client/fetchallclient',
            'fetchallclient');
    }

    registerClient(clientDto: ClientDto) {
        return this.connectionService.postConnection('client/register', clientDto,
            'registerClient');
    }

    randomapikey() {
        return this.connectionService.getConnection('client/randomapikey',
            '');
    }

    getallEndpointheader() {
        return this.connectionService.getConnection('endpointdetail/getall'
            ,
            '');
    }

    registerEndpointdetail(levelid :number, recordid :number, endpointheaderDto: EndpointheaderDto) {
        return this.connectionService.postConnection('endpointdetail/register?levelid='+levelid+'&recordid='+recordid, endpointheaderDto,
            '');
    }


    apibymoduleid(moduleid: number, pageno: number, pagesize: number) {
        return this.connectionService.getConnection('api/apibymoduleid/'
            + moduleid + '?pageno=' + pageno + '&pagesize=' + pagesize,
            'apibymoduleid');
    }



    registerApi(apiDto: any) {
        return this.connectionService.postConnection('api/register', apiDto,
            '');
    }

    apigetall() {
        return this.connectionService.getConnection('api/apigetall',
            '');
    }

    apibyclientid(clientId: number) {
        return this.connectionService.getConnection('api/apibyclientid/'
            + clientId,
            '');
    }

    apibyclientidv2(clientId: number) {
        return this.connectionService.getConnection('api/apibyclientid/v2/'
            + clientId,
            '');
    }


    apisearch(apiname?, apititle?, moduletitle?, num?): Observable<any> {
        return this.connectionService.getConnection('api/apisearch/' + num +
            (apiname ? '?apiname=' + apiname : '') +
            ((apiname && apititle) ? '&apititle=' + apititle : (apititle ? '?apititle=' + apititle : '')) +
            ((apiname || apititle) && moduletitle ? '&moduletitle=' + moduletitle :
                (moduletitle ? '?moduletitle=' + moduletitle : '')) +
            '')
    }

    getbyapiid(apiId: number) {
        return this.connectionService.getConnection('apirule/getbyapiid/'
            + apiId,
            '');
    }

    apirulgetall() {
        return this.connectionService.getConnection('apirule/apirulgetall',
            '');
    }

    registerRuleApi(rouleDto: RouleDto) {
        return this.connectionService.postConnection('apirule/register', rouleDto,
            '');
    }

    ruleconditiongetall() {
        return this.connectionService.getConnection('rulecondition/getall',
            '');
    }

    getbyruleid(rulId: number) {
        return this.connectionService.getConnection('rulecondition/getbyruleid/'
            + rulId, '');
    }

    registerRuleCondition(rouleConditionDto: ConditionDto) {
        return this.connectionService.postConnection('rulecondition/register', rouleConditionDto,
            '');
    }

    getbymessageId(messageId: number) {
        return this.connectionService.getConnection('message/messagebyid/'
            + messageId, '');
    }

    getlmitbyapiid(apiid: number) {
        return this.connectionService.getConnection('limitapi/getlmitbyapiid/'
            + apiid, '');
    }

    savelimit(rouleDto: RouleDto) {
        return this.connectionService.postConnection('limitapi/save', rouleDto, '');
    }

    findbyendpointid(endpointid: number) {
        return this.connectionService.getConnection('iplimit/findbyendpointid/'
            + endpointid,
            '');
    }

   /* registerIplimit(param: any) {
        return this.connectionService.postConnection('iplimit/register', param,
            '');
    }*/

    registerIpLimit(endpointId,param: any) {
        debugger
        return this.connectionService.postConnection('iplimit/'+endpointId+'/register',
            param,'');
    }

    convertXmlToTreeNode(param: any) {

        return this.connectionService.postConnection('mediator/convert', param,
            '');
    }

    convertXmlToTreeNodeTest() {
        return this.connectionService.getConnection('mediator/testconvert',
            '');
    }

    sendObjectTree(strinTree: string) {
        return this.connectionService.getConnection('mediator/' + strinTree, '')
    }

    mediatorRegister(mediatorInfo) {
        return this.connectionService.postConnection('mediator/register', mediatorInfo, '')
    }

    mediatorchangeRegister(mediatorchange) {
        return this.connectionService.postConnection('mediatorchange/register', mediatorchange, '')
    }

    mediatorGetAll() {
        return this.connectionService.getConnection('mediator/findall',
            '');
    }

    activationMediator(mediatorid) {
        return this.connectionService.postConnection('mediator/active/' + mediatorid, '')
    }

    deactivationMediator(mediatorid) {
        return this.connectionService.postConnection('mediator/deactive/' + mediatorid, '')
    }

    rulesearch(pageno:number,pagesize:number,name?, httpstatuscode?, messageid?, ruletemplate?): Observable<any> {
        debugger
        return this.connectionService.getConnection('rule/search?' +'pageno='+pageno+'&pagesize='+pagesize+
            (name ? '&name=' + name : '') +
            (httpstatuscode ? '&httpstatuscode=' + httpstatuscode : '') +
            (messageid ? '&messageid=' + messageid : '')+
            (ruletemplate||ruletemplate==0 ? '&ruletemplate=' + ruletemplate : '') +
            '')
    }

    registerRule(rouleDto) {
        return this.connectionService.postConnection('rule/register', rouleDto,
            '');
    }

    findbyclientid(clientid: number) {
        return this.connectionService.getConnection('clientrule/findbyclientid/'
            + clientid, '');
    }

    registerClientRule(clientRuleDto) {
        return this.connectionService.postConnection('clientrule/register', clientRuleDto,
            '');
    }

    findbyapiid(apiid: number) {
        return this.connectionService.getConnection('mediator/findactivemediatorbyapiid/'
            + apiid, '');
    }

    findAllMediator(title?) {
        return this.connectionService.getConnection('mediator/findall' + (title ? '?title=' + title : '') + ''
            , '');
    }

    mediatorFindByApiId(apiid: number) {
        return this.connectionService.getConnection('mediator/findactivemediatorbyapiid/'
            + apiid, '');
    }

    searchbyclientname(clientName?: string) {
        return this.connectionService.getConnection('client/searchbyclientname/' + (clientName ? clientName : '') + ''
            , '');
    }

    findbymediatorid(mediatorId: number) {
        return this.connectionService.getConnection('mediatorchange/findbymediatorid/'
            + mediatorId, '');
    }

    deactiveMediatorchange(mediatorchangid: number) {
        return this.connectionService.postConnection('mediatorchange/deactive/'
            + mediatorchangid, '', '');
    }

    activeMediatorchange(mediatorchangid: number) {
        return this.connectionService.postConnection('mediatorchange/active/'
            + mediatorchangid, '', '');
    }

    clientsearchbyclientnameandmobileno(clientname?, mobile?): Observable<any> {
        return this.connectionService.getConnection('client/searchbyclientnameandmobileno?' +
            (clientname ? 'clientname=' + clientname : '') +
            ((clientname && mobile) ? '&mobile=' + mobile : (mobile ? 'mobile=' + mobile : '')) +
            '')
    }

    registerMediatorChange(mediatorChangeDto) {
        return this.connectionService.postConnection('mediatorchange/register', mediatorChangeDto,
            '');
    }

    getinputheadernames() {
        return this.connectionService.getConnection('endpointdetail/getinputheadernames'
            , '');
    }

    getapistatistict(apiId: number, numStatus: number) {
        return this.connectionService.getConnection('api/getapistatistict/'
            + apiId + '/' + numStatus, '');
    }

    requestlogsgetbyapiid(id: number, pageno: number, pagesize: number,) {
        return this.connectionService.getConnection('requestlog/requestlogsgetbyapiid/'
            + id + '?pageno=' + pageno + '&pagesize=' + pagesize
            , '');
    }

    checkactiveendpointbymoduleid(moduleid: number) {
        return this.connectionService.getConnection('endpoint/checkactiveendpointbymoduleid/' +
            moduleid, '')
    }

    ruleFindByApiid(apiid: number) {
        return this.connectionService.getConnection('apirule/findbyapiid/' +
            apiid, '')
    }

    registerRuleAttach(ruleObj) {
        return this.connectionService.postConnection('apirule/register', ruleObj,
            '');
    }
    apiruleStatus(apiid,ruleid,status) {
        return this.connectionService.postConnection('apirule/'+apiid+'/'+ruleid+'/'+status,
            null,
            );
    }

    apibymoduleidhasntclient(moduleid?: any, clientid?: any) {
        return this.connectionService.getConnection('api/apibymoduleidhasntclient/' +
            moduleid + '/' + clientid, '')
    }

    clientAttachApi(clientApiObj) {
        return this.connectionService.postConnection('client/register/clientapi', clientApiObj,
            '');
    }






    apibyid(apiid) {
        return this.connectionService.getConnection('api/apibyid/' +
            apiid, '')
    }

    getclientapibyclientidandapiid(clientid, apiid) {
        return this.connectionService.getConnection('client/getclientapibyclientidandapiid/' +
            clientid + '/' + apiid, '')
    }

    getByRuleId(ruleid) {
        return this.connectionService.getConnection('rule/getbyruleid/' +
            ruleid, '')
    }

    getinputheadernamesUrl() {
        debugger
        return this.connectionService.getConnection('endpointdetail/getinputnames'
            , '')
    }

    mediatorTestConvert(conetnt) {
        return this.connectionService.postConnection('mediator/testconvert', conetnt,
            '');
    }

    mediatorDownloadeConvertedFile(conetnt) {
        return this.connectionService.postConnection('mediator/downloadeconvertedfile2', conetnt,
            '');
    }

    getclinetidbyapikey(apiKey) {
        return this.connectionService.getConnection('client/getclinetidbyapikey' + '?apikey=' + apiKey,
            '');
    }

    getallFeeheader() {
        return this.connectionService.getConnection('feeheader/getall',
            '');
    }

    apifeesearch(partyid, clientid?, apiid?,fromdate?,todate?): Observable<any> {
        return this.connectionService.getConnection('apifee/search?partyid=' + partyid +
            (clientid ? '&clientid=' + clientid : '') +
            (apiid ? '&apiid=' + apiid : '') +
            (fromdate ? '&fromdate=' + fromdate : '')+
            (todate ? '&todate=' + todate : '')
            ,'' )
    }

    feeheaderRegister(feeheader) {
        return this.connectionService.postConnection('feeheader/register', feeheader,
            '');
    }

    apifeeRegister(partyId, feeHeaderId) {
        return this.connectionService.postConnection('apifee/register/' + partyId + '/' + feeHeaderId,
            '');
    }

    apifeeRegister2(partyId, feeHeaderId, clientId, apiId,
    ) {
        return this.connectionService.postConnection('apifee/register2/' + partyId + '/' + feeHeaderId
            + '/' + clientId + '/' + apiId,
            '');
    }

    findbyfeeheaderid(feeId): Observable<any> {
        return this.connectionService.getConnection('feeheader/findbyfeeheaderid/' + feeId,
            '')
    }

    apibypartyid(partyid): Observable<any> {
        return this.connectionService.getConnection('api/apibypartyid/' + partyid,
            '')
    }

    billsearch(partyid, clientid?, apiid?): Observable<any> {
        return this.connectionService.getConnection('bill/search?'
            + (partyid ? 'partyid=' + partyid : '') +
            ((partyid && clientid) ? '&clientid=' + clientid : (clientid ? 'clientid=' + clientid : '')) +
            ((partyid || clientid) && apiid ? '&apiid=' + apiid : (apiid ? 'apiid=' + apiid : ''))
            , '')
    }

    getapicountwithoutfeebyparty(partyid): Observable<any> {
        return this.connectionService.getConnection('apifee/getapicountwithoutfeebyparty/' + partyid,
            '')
    }

    getapicountwithoutfeebypartyandclientandapi(partyid, clientid, apiid): Observable<any> {
        return this.connectionService.getConnection('apifee/getapicountwithoutfeebypartyandclientandapi/' + partyid
            + '/' + clientid + '/' + apiid,
            '')
    }

    getcalculation(partyid?, clientid?, apiid?): Observable<any> {
        return this.connectionService.getConnection('bill/getcalculation'
            + ((partyid ? '?partyid=' + partyid : '') +
                ((partyid && clientid) ? '&clientid=' + clientid : (clientid ? '?clientid=' + clientid : '')) +
                ((partyid || clientid) && apiid ? '&apiid=' + apiid : (apiid ? '?apiid=' + apiid : '')))
            , '')
    }

    getcalcsummarybypartyid(partyid, fromdate, todate): Observable<any> {
        return this.connectionService.getConnection('dailysummary/getcalcsummarybypartyid/' + partyid
            + '/' + fromdate + '/' + todate,
            '')
    }

    getsourcecurl(apiId): Observable<any> {
        return this.connectionService.getDownloadConnection('api/getsourcecurl/' + apiId,
            '')
    }

    billRegister(bill) {
        return this.connectionService.postConnection('bill/register', bill,
            '');
    }

    getapiproducednodebyapiid(apiid): Observable<any> {
        return this.connectionService.getConnection('api/producednode/getapiproducednodebyapiid/' + apiid,
            '')
    }

    producednodeRegister(producednode) {
        return this.connectionService.postConnection('api/producednode/register', producednode,
            '');
    }

    getapirequirednodebyapiid(apiid): Observable<any> {
        return this.connectionService.getConnection('api/requirednode/getapirequirednodebyapiid/' + apiid,
            '')
    }

    requirednodeRegister(requirednode) {
        return this.connectionService.postConnection('api/requirednode/register', requirednode,
            '');
    }

    matchdependnode(matchdenodes) {
        return this.connectionService.postConnection('api/matchnode/matchdependnode', matchdenodes,
            '');
    }

    sequenceFlowRegister(sequenceFlow) {
        return this.connectionService.postConnection('api/sequenceflow/v2/register', sequenceFlow,
            '');
    }

    getapisequencebyapiid(apiid): Observable<any> {
        return this.connectionService.getConnection('api/sequenceflow/getapisequencebyapiid/' + apiid,
            '')
    }
    getapisequencebyparentid(parentid): Observable<any> {
        return this.connectionService.getConnection('api/sequenceflow/getapisequencebyparentid/' + parentid,
            '')
    }
    getsequenceflowbyapiid(sequenceid): Observable<any> {
        return this.connectionService.getConnection('api/sequenceflow/getsequenceflowbyapiid/' + sequenceid,
            '')
    }
    getsequenceflowlistbyapiid(apiid): Observable<any> {
        return this.connectionService.getConnection('api/sequenceflow/getsequenceflowlistbyapiid/' + apiid,
            '')
    }
    checkapicapability(apiid) {
        debugger
        return this.connectionService.getConnection('api/sequenceflow/checkapicapability/' +apiid+ '');
    }
    moduleFindbyapiid(apiid): Observable<any> {
        return this.connectionService.getConnection('module/findbyapiid/' + apiid,
            '')
    }

    partyFindbymoduleid(moduleid): Observable<any> {
        return this.connectionService.getConnection('party/findbymoduleid/' + moduleid,
            '')
    }



    getmatchnodebyapiid(apiid): Observable<any> {
        return this.connectionService.getConnection('api/matchnode/getmatchnodebyapiid/' + apiid,
            '')
    }

    getmatchnodebysequenceid(sequenceid): Observable<any> {
        return this.connectionService.getConnection('api/matchnode/getmatchnodebysequenceid/' + sequenceid,
            '')
    }


    encodedetailRegister(encodedetail) {
        return this.connectionService.postConnection('api/encodedetail/register', encodedetail,
            '');
    }
    encodedetailbyapiid(apiid): Observable<any> {
        return this.connectionService.getConnection('api/encodedetail/findbyapiid/' + apiid,
            '')
    }
    /*  releasenote(): Observable<any> {
          return this.connectionService.getConnection('releasenote/findall',
              '')
      }*/
    releasenote(pageno: number, pagesize: number) {
        return this.connectionService.getConnection('releasenote/findall?'
            + 'pageno=' + pageno + '&pagesize=' + pagesize,
            '');
    }
    apibymoduleidandname(moduleId: number, name: string): Observable<any> {
        return this.connectionService.getConnection('api/apibymoduleidandname/' + moduleId
            + (name ? '?name=' + name : ''),
            '')
    }
    getdestinationcurl(apiId): Observable<any> {
        return this.connectionService.getDownloadConnection('api/getdestinationcurl/' + apiId,
            '')
    }
    getsummarydetailinfo(partyid,clientid,apiid,dt,pagesize,pageno){
        return this.connectionService.getConnection('dailysummary/getsummarydetailinfo/'
            + partyid+'/'+clientid+'/'+apiid+'/'+dt+'?'   + 'pageno=' + pageno + '&pagesize=' + pagesize,
            '')
    }
    getstatistictoday(){
        return this.connectionService.getConnection('statistic/today',
            '')
    }
    detailbystatistic(fromdate: number, todate: number, partyid: number, moduleid: number, apiid: number,download:number) {
        return this.connectionService.getConnection('requestlog/report/detailbystatistic?' +
            'fromdate=' + fromdate + '&todate=' + todate + '&partyid=' + partyid + '&moduleid=' + moduleid +
            '&apiid=' + apiid+'&download=' + download,
            '')
    }
    detail(requestlogid: number) {
        return this.connectionService.getConnection('requestlog/report/detail?' +
            'requestlogid=' + requestlogid, '')
    }

    encodedetailRegister2(levelid,recordid,encodedetail) {
        return this.connectionService.postConnection('endpointdetail/register', encodedetail,
            'reportLog');
    }
    getstatisticReport(download,fromdate, todate): Observable<any> {
        return this.connectionService.getConnection('requestlog/v2/report/getstatistic?' +
            (fromdate ? 'fromdate=' + fromdate : '') +
            ((fromdate && todate) ? '&todate=' + todate : (todate ? 'todate=' + todate : '')) +
            ((fromdate || todate) && download!=null&&download!=undefined ? '&download=' + download : (download!=null&&download!=undefined ? 'download=' + download : '')) +'', 'reportLog')

    }
    DownloadStatisticReport(download,fromdate, todate): Observable<any> {
        return this.connectionService.getDownloadConnection('requestlog/v2/report/getstatistic?' +
            (fromdate ? 'fromdate=' + fromdate : '') +
            ((fromdate && todate) ? '&todate=' + todate : (todate ? 'todate=' + todate : '')) +
            ((fromdate || todate) && download!=null&&download!=undefined ? '&download=' + download : (download!=null&&download!=undefined ? 'download=' + download : '')) +'', 'reportLog')
    }
    summarybillRegister(summaryBill) {
        return this.connectionService.postConnection('summarybill/register', summaryBill,
            '');
    }
    getnonehubelmentbyapiid(apiid) {
        return this.connectionService.getConnection('apihub/element/getnonehubelmentbyapiid/'
            +apiid,
            '');
    }
    getbillsummary(billid) {
        return this.connectionService.getConnection('bill/getbillsummary/'
            +billid,
            '');
    }
    gethubelmentbyapiid(apiId) {
        return this.connectionService.getConnection('apidatahub/gethubparambyapiid/'
            +apiId,
            '');
    }
    getAllDataHub(pageno, pagesize) {
        return this.connectionService.getConnection('datahub/all?'
            + 'pageno=' + pageno + '&pagesize=' + pagesize,
            '');
    }
    datahubRegister(hubRegister) {
        return this.connectionService.postConnection('datahub/register', hubRegister,
            '');
    }
    getbydbanmeip(pageno ,pagesize,dbname,ip): Observable<any> {
        return this.connectionService.getConnection('datahub/getbydbanmeip?' +
            'pageno=' + pageno + '&pagesize=' + pagesize+
            (dbname ? '&dbname=' + dbname : '') +
            ((dbname && ip) ? '&ip=' + ip : (ip ? '&ip=' + ip : '')) +
            '', '')
    }
    hubFindByApiid(apiid: number) {
        return this.connectionService.getConnection('apidatahub/getbyapiid/' +
            apiid, '')
    }
    registerHubAttach(hubObj) {
        return this.connectionService.postConnection('apidatahub/register', hubObj,
            '');
    }
    getapidatahubendpointdetailbyapiid(apiid: number) {
        return this.connectionService.getConnection('endpointdetail/getapidatahubendpointdetailbyapiid/' +
            apiid, '')
    }
    registerHub(hubObj) {
        return this.connectionService.postConnection('datahub/register', hubObj,
            '');
    }
    testconnection(hubid:number) {
        return this.connectionService.postConnection('datahub/testconnection/'+ hubid,
            '');
    }
    testconnectionandquery(hubid :number,apidatahubid:number,query :string) {
        return this.connectionService.postConnection('apidatahub/testconnectionandquery/'+ hubid+'/'+apidatahubid+
            '?query='+query, '');
    }
    apibymoduleidv2(moduleid : number) {
        return this.connectionService.getConnection('api/v2/apibymoduleid/' +
            moduleid , '')
    }
    getPiChart(queryParams:string) {
        return this.connectionService.getConnection("statistic/piechart" + "?day=" + queryParams)
    }
    getFetchAllParty() {
        return this.connectionService.getConnection("party/fetchallparty")
    }
    getModulePieChartByParty(urlParam: string, queryParams:string) {
        return this.connectionService.getConnection("statistic/modulepiechartbyparty/" + urlParam + "?day=" + queryParams)
    }

    testconnectionandproc(hubid:number,apidatahubid:any,spParam:any) {
        apidatahubid= +apidatahubid
        return this.connectionService.postConnection('apidatahub/testconnectionandproc/'+ hubid+'/'+apidatahubid
            ,spParam, '');
    }
    registerApidatahubmapresult(objMap:any) {
        debugger
        return this.connectionService.postConnection('apidatahubmapresult/registerall'
            ,objMap,
            '');
    }
    registerApihubparam(param:any) {
        debugger
        return this.connectionService.postConnection('apidatahubparam/registerall'
            ,param,
            '');
    }
    getapidatahubbyapiid(apiid: number) {
        return this.connectionService.getConnection("apidatahub/getapidatahubbyapiid/"+apiid,
            '')
    }
    changeapidatahubstatus(apihubid:any,status:any) {
        debugger
        return this.connectionService.postConnection('apidatahub/changeapidatahubstatus/'
            +apihubid+'/'+status,
            '');
    }
    getdatahubinfo(apiid: number) {
        return this.connectionService.getConnection("datahub/datahubinfo/"+apiid,
            '')
    }
    registerelementshub(param:any) {
        debugger
        return this.connectionService.postConnection('apidatahub/elements/register'
            ,param,
            '');
    }
    finalapidatahub(apidatahubid:any,hubid:any) {
        debugger
        return this.connectionService.postConnection('apidatahub/finalapidatahub/'+apidatahubid+'/'+hubid
            ,undefined, '');
    }
    getApiCategory(mainId: any[]) {
        return this.connectionService.getConnection("integration/apistore/web/apicategory/maincategory/" + mainId , '')
    }
    getApiMainCategory() {
        return this.connectionService.getConnection("integration/apistore/web/apimaincategory" , '')
    }
    transferToStore(apiid:any,catid:any) {
        debugger
        return this.connectionService.postConnection('api/transfer/to/store/'+apiid+'/'+catid
            ,undefined, '');
    }
    apistoreJwt() {
        return this.connectionService.postConnection('integration/apistore/jwt/login',
            '');
    }
    integrationTransfer(token :any,apiid:number,catid:number,gatewaymoduleid :number) {
        return this.connectionService.postConnection('integration/apistore/transfer/apiinfo/'+apiid+'/'+catid+'/'+gatewaymoduleid +'?token='+token,
            '');
    }
    apilogrequest(token,pageno ,pagesize) {
        return this.connectionService.getConnection("integration/apistore/dashboard/apilog/request/"+ pageno+'/'+pagesize+'?token='+token, '')
    }
    integrationTransferlog(token :any,partyid:number,moduleid:number,requestid :number,shamsiyear:number,shamsimonth:number,actiontype:number) {
        debugger
        if (actiontype==0){
            debugger
            return this.connectionService.postDownloadConnection('integration/apistore/transfer/log/'+partyid+'/'+moduleid+'/'+requestid +'/'+shamsiyear +'/'+shamsimonth  +'/'+actiontype +'?token='+token, '',);


        }else if(actiontype==1){
            debugger
            return this.connectionService.postConnection('integration/apistore/transfer/log/'+partyid+'/'+moduleid+'/'+requestid +'/'+shamsiyear +'/'+shamsimonth  +'/'+actiontype +'?token='+token, '');

        }

    }
    responsedelay(clientid: number,fromdate:number,todate:number,delay:number,moduleid?:number) {
        return this.connectionService.getConnection("statistic/responsedelay/delay?clientid="+clientid+'&fromdate='+fromdate+'&todate='+todate+'&delay='+delay+(moduleid?'&moduleid='+moduleid:''),
            '')
    }
    responsedelayMultipleservice(dt:string) {
        return this.connectionService.getConnection("statistic/responsedelay/specialday/multipleservice?dt="+dt,
            '')
    }
    responsedelaySingularservice(dt:string,delay:string,apiid:string) {
        return this.connectionService.getConnection("statistic/responsedelay/specialday/singularservice?dt="+dt+'&delay='+delay+'&apiid='+apiid,
            '')
    }
    responsedelayDetail(dt:string,apiid:string,sorttype:string,pageno:number,pagesize:number) {
        return this.connectionService.getConnection("statistic/responsedelay/detail?dt="+dt+'&sorttype='+sorttype+'&apiid='+apiid+'&pageno='+pageno+'&pagesize='+pagesize,
            '')
    }
    compareToDay(day:number) {
        return this.connectionService.getConnection("statistic/compare/ty/"+day ,
            '')
    }
    registerallFailover(param:any) {
        debugger
        return this.connectionService.postConnection('datahub/failover/registerall'
            ,param,
            '');
    }
    getFailover(hubId:number) {
        return this.connectionService.getConnection("datahub/failover/"+hubId ,
            '')
    }
    failoverStatus(failoverid :any,status:number) {
        return this.connectionService.postConnection('datahub/failover/status/'+failoverid+'/'+status,
            '');
    }

    apicacheApiinfo(pageno ,pagesize,moduleid,apitype): Observable<any> {
        return this.connectionService.getConnection('apicache/apiinfo?' +
            'pageno=' + pageno + '&pagesize=' + pagesize+
            (moduleid ? '&moduleid=' + moduleid : '') +
            (apitype? '&apitype=' + apitype : '')+
            '', '')
    }
    getElementsModule(moduleId:number) {
        return this.connectionService.getConnection("endpointdetail/getbymoduleid/"+moduleId ,
            '')
    }
    getPublickkey(clientid:number) {
        return this.connectionService.getConnection("client/publickkey/"+clientid ,
            '')
    }
    getDigitalkey(clientid:number) {
        return this.connectionService.getConnection("client/digitalkey/"+clientid ,
            '')
    }
    getendpointdetailByModuleId(moduleId:number) {
        return this.connectionService.getConnection("endpointdetail/v2/getbymoduleid/"+moduleId ,
            '')
    }
    apicacheRegister(moduleId :any,cache:CacheDto[]) {
        return this.connectionService.postConnection('apicache/register/'+moduleId,cache,
            '');
    }
    getApiCache(moduleId:number) {
        return this.connectionService.getConnection("apicache/"+moduleId ,
            '')
    }
    apicacheStatus(apicacheid:number,status :number) {
        debugger
        return this.connectionService.postConnection('apicache/'+apicacheid+'/'+status+'/status',
            '');
    }
    getApiCachebyMAId(moduleId:number,apiId:number) {
        return this.connectionService.getConnection("apicache/"+moduleId +'/'+apiId +'/history',
            '')
    }
    fetchApicacheList(apicacheid:any) {
        debugger
        return this.connectionService.postConnection('apicache/list',apicacheid,
            '');
    }
    addapiignoresignature(apiId:any) {
        debugger
        return this.connectionService.postConnection('endpointdetail/addapiignoresignature/'+apiId,
            '');
    }

    searchbyclientid(clientId:number) {
        return this.connectionService.getConnection("client/searchbyclientid/"+clientId ,
            '')

    }

    config() {
        return this.connectionService.getConnection('config', '');
    }

    activeAndDeactiveAccess(apiId,clientId,activeFlag){
        if (activeFlag==1){
            return this.connectionService.postConnection('client/clientapi/access/'+apiId+'/'+clientId+'/active',
                '');
        }else if(activeFlag==2){
            return this.connectionService.postConnection('client/clientapi/access/'+apiId+'/'+clientId+'/deactive',
                '');
        }
    }
    getapisequencebyapiidv2(pageno ,pagesize,apiid) {
        debugger
        return this.connectionService.getConnection('api/sequenceflow/v2/getapisequencebyapiid/' +apiid+'/?'+
            'pageno=' + pageno + '&pagesize=' + pagesize+
            '');
    }
    getapisequencebyid(sequencebyid) {
        debugger
        return this.connectionService.getConnection('api/sequenceflow/getsequenceflowlistbyid/' +sequencebyid,
            '');
    }



    registerReceiverEffect(receiverSignal: Signal<any>) {
        const receiver$ = toObservable(receiverSignal);

        return receiver$.pipe(
            filter(r => !!r),
            switchMap(r => this.connectionService.postConnection('alarm/receiver/register', r, ''))
        );
    }
    registerSectionReceiverEffect(data: any[]) {
        const receiver$ = of(data);
        return receiver$.pipe(
            filter(r => !!r),
            switchMap(r =>
                this.connectionService.postConnection('alarm/section_receiver/register', r, '')
            )
        );
    }

    getAlarmDetail(alarmid: number) {
       /* return this.connectionService.getConnection(
            `alarm/detail?alarmid=${encodeURIComponent(alarmid)}`,
            '',

        );*/
        return this.connectionService.getConnection(
            `alarm/detail?alarmid=${encodeURIComponent(alarmid)}`,
            '',
            {
                responseType: 'json', // ✅ چون بک JSON برمی‌گردونه
                headers: { 'Accept': 'application/json' } // ✅ درخواست JSON بده
            },
        );
    }
    sectionReceiverStatusEffect(status: number, sectionId: string, receiverId: string) {
        debugger
        const url = `alarm/section_receiver/${status}/status` +
            (sectionId ? `?sectionid=${sectionId}` : '') +
            (receiverId ? `${sectionId ? '&' : '?'}receiverid=${receiverId}` : '');

        return this.connectionService.postConnection(url, {}, '');
    }
    testrun(ruleid,curl:any) {
        debugger
        return this.connectionService.postConnection('rulecondition/testrun/'+ruleid,curl,
            '');
    }
    registerElementRulecondition(param:any[]) {
        debugger
        return this.connectionService.postConnection('rulecondition/element/register'
            ,param,
            '');
    }
    registerGroupRulecondition(param:any[]) {
        debugger
        return this.connectionService.postConnection('rulecondition/element/group/register'
            ,param,
            '');
    }

    ruleconditionElement(ruleid ) {
        debugger
        return this.connectionService.getConnection('rulecondition/element/' +ruleid ,
            '');
    }
    ruleconditionElementGroup(ruleid ) {
        debugger
        return this.connectionService.getConnection('rulecondition/element/group/info/' +ruleid ,
            '');
    }
    // Parameters
}

