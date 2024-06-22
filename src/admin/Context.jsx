/* eslint-disable */
import React, { createContext } from 'react';
// import { factory } from './factoryjs/create-factory';

export const UserContext = createContext();

export class UserProvider extends React.Component {
    login = newUserLoggedIn => {
        this.setState({ isUserLoggedIn: newUserLoggedIn })
    };
    logout = newUserLoggedIn => {
        this.setState({ isUserLoggedIn: newUserLoggedIn })
    };
    updateUserName = newName => {
        this.setState({ userName: newName });
    };
    // updatewidgetType = newwidgetType => {
    //     this.setState({ widgetType: newwidgetType });
    // };
    // updateSelectedEntity = newSelectedEntity => {
    //     this.setState({ selectedEntity: newSelectedEntity });
    // };
    // updateBottomMenuState = thisbottomMenuState => {
    //     this.setState({ bottomMenuState: thisbottomMenuState });
    // };
    // updateSceneId = newsceneid => {
    //     this.setState({ projectJSON: factory.projectJSON });
    //     const sceneEl = document.querySelector("a-scene");
    //     sceneEl.emit('changescene', {
    //         sceneId: newsceneid
    //     });

    //     // const sceneEl = document.querySelector("a-scene");
    //     // sceneEl.emit('changescene', {
    //     //     sceneId: newsceneid
    //     // });
    // };
    // updateSceneProjectJSON = (newSceneJSON, newpptvrSceneJson) => {
    //     const bgId = 'bg' + newpptvrSceneJson.sceneid;
    //     // this.state.projectJSON.backgrounds[bgId] = {
    //     //     id: bgId,
    //     //     type: 'image360',
    //     //     src: newpptvrSceneJson.bgimage,
    //     //     defaultSceneOrientation: newpptvrSceneJson.defaultSceneOrientation
    //     // };
    //     // this.state.projectJSON.scenes[newSceneJSON.id] = newSceneJSON;
    //     // this.setState({ projectJSON: this.state.projectJSON });

    //     factory.projectJSON.backgrounds[bgId] = {
    //         id: bgId,
    //         type: 'image360',
    //         src: newpptvrSceneJson.bgimage,
    //         defaultSceneOrientation: newpptvrSceneJson.defaultSceneOrientation
    //     };
    //     factory.projectJSON.scenes[newSceneJSON.id] = newSceneJSON;
    //     this.setState({ projectJSON: factory.projectJSON });
    // };
    // updateBackgroundJSON = (updatedSceneObj) => {
    //     this.state.projectJSON.backgrounds['bg' + updatedSceneObj._id].src = updatedSceneObj.updatedVal.bgimage;
    //     factory.projectJSON.backgrounds['bg' + updatedSceneObj._id].src = updatedSceneObj.updatedVal.bgimage;
    //     this.projectSystem = AFRAME.utils.getSystemObj('s-project');
    //     this.projectSystem.project = factory.projectJSON;
    //     this.setState({ projectJSON: this.state.projectJSON });
    // };
    // deleteSceneProjectJSON = (deletedsceneid) => {
    //     // delete this.state.projectJSON.scenes[deletedsceneid];
    //     delete factory.projectJSON.scenes[deletedsceneid];
    //     this.setState({ projectJSON: factory.projectJSON });
    // };
    // updateProjectJSONonWidgetChange = (updatedObj) => {
    //     this.state.projectJSON.scenes[factory.currentSceneId].widget[updatedObj.id] = updatedObj;
    //     this.setState({ projectJSON: this.state.projectJSON });
    // };
    // updateCurrentSceneId = (updatedSceneId) => {
    //     this.state.currentSceneId = updatedSceneId;
    // };

    // updateNotificationMsg = newNotiMsg => {
    //     this.setState({ notificationMsg: newNotiMsg });
    // };
    // updateGuruModuleStatus = gurumodulestatus => {
    //     this.setState({ isGuruModuleEnabled: gurumodulestatus });
    // };
    updateUserRoleStatus = userrolestatus => {
        this.setState({ userRole: userrolestatus });
    };
    // updateSubscriptionType = subscriptiontype => {
    //     this.setState({ subscriptionType: subscriptiontype });
    // };
    // updateSubscriptionModule = subscriptionmodule => {
    //     this.setState({ subscriptionModule: subscriptionmodule });
    // };
    // updateSceneSynchronizationStatus = synchronizationstatus => {
    //     this.setState({ sceneSynchronization: synchronizationstatus });
    // };


    state = {
        isUserLoggedIn: false,
        login: this.login,
        logout: this.logout,
        userName: "",
        // widgetType: 'temptext',
        // systemType: 'vr',
        // notificationMsg: 'Tested Message',
        // selectedEntity: {
        //     obj: {},
        //     melzoObj: {},
        //     type: null,
        // },
        // isGuruModuleEnabled:false,
        userRole: '',
        // subscriptionType: '',
        // subscriptionModule: [],
        // bottomMenuState: 'SCENE_LIST',
        // sceneid: '',
        // projectJSON: {},
        // currentSceneId: '',
        // sceneSynchronization:false,
        // updatewidgetType: this.updatewidgetType,
        // updateSceneId: this.updateSceneId,
        updateUserName: this.updateUserName,
        // updateSceneProjectJSON: this.updateSceneProjectJSON,
        // deleteSceneProjectJSON: this.deleteSceneProjectJSON,
        // updateBackgroundJSON: this.updateBackgroundJSON,
        // updateBottomMenuState: this.updateBottomMenuState,
        // updateSelectedEntity: this.updateSelectedEntity,
        // updateCurrentSceneId: this.updateCurrentSceneId,
        // updateNotificationMsg: this.updateNotificationMsg,
        // updateGuruModuleStatus:this.updateGuruModuleStatus,
        updateUserRoleStatus:this.updateUserRoleStatus,
        // updateSubscriptionType:this.updateSubscriptionType,
        // updateSubscriptionModule:this.updateSubscriptionModule,
        // updateSceneSynchronizationStatus:this.updateSceneSynchronizationStatus
    };
    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export const UserConsumer = UserContext.Consumer;