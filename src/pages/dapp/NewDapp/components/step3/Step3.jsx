import React from "react";
import Step3Diagram from "./Step3Diagram";
import { Grid, Button } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { STEP1_DATA, STEP2_ENTITIES } from "src/redux/User/Dapps/actionTypes";
import { STEP2_RELATIONSHIPS } from "src/redux/User/Dapps/actionTypes";
import { useNavigate } from "react-router";
import { dappActions } from "src/redux/User/Dapps/reducer";

export default function Step3(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const step1Data = useSelector((state) => state.Dapp.step1Data);
    const step2Entities = useSelector((state) => state.Dapp.step2Entities);
    const step2Relationships = useSelector((state) => state.Dapp.step2Relationships);

    const findNameOfEntity = (entityId, entitylength) => {
        for (let i = 0; i < entitylength; i++) {
            if (entityId === step2Entities[i].id) {
                return step2Entities[i].data.name;
            }
        }
    };

    const findRelationship = (entityId, lengthRelationship, lengthEntity) => {
        let data = [];
        for (let i = 0; i < lengthRelationship; i++) {
            if (entityId === step2Relationships[i].source) {
                data.push({
                    type: step2Relationships[i].data.type,
                    reference_to_entity: findNameOfEntity(step2Relationships[i].target, lengthEntity),
                });
            }
            // else if (entityId === step2Relationships[i].target) {
            //     data.push({
            //         type: reverseString(step2Relationships[i].data.type),
            //         reference_to_entity: findNameOfEntity(step2Relationships[i].source, lengthEntity),
            //     });
            // }
        }
        return data;
    };

    const findNameAttr = (attrList, attrId) => {
        let length = attrList.length;
        for (let i = 0; i < length; i++) {
            if (attrList[i].idAttr === attrId) {
                return attrList[i].name;
            }
        }
    };

    const hdCreateDApp = () => {
        const entitiesLength = step2Entities.length;
        const relationShipLength = step2Relationships.length;
        let body = {
            dapp_name: step1Data.dapp_name,
            dapp_description: step1Data.dapp_description,
            dapp_logo: step1Data.dapp_logo,
            network_id: step1Data.network_id,
            encryption_type: step1Data.encryption_type,
            entities: step2Entities.map((entity, index) => {
                return {
                    name: entity.data.name,
                    primary_key: findNameAttr(entity.data.attributes, entity.data.primary_key),
                    attributes: entity.data.attributes.map((attr, i) => {
                        return {
                            name: attr.name,
                            type: attr.type,
                            description: attr.description,
                            encrypt: attr.encrypt,
                        };
                    }),
                    relationships: findRelationship(entity.id, relationShipLength, entitiesLength),
                };
            }),
            diagrams: [...step2Entities, ...step2Relationships],
        };
        console.log(body)
        dispatch(dappActions.createDApp({ body: body }));
        dispatch({
            type: STEP1_DATA,
            payload: { dapp_name: "", dapp_description: "", dapp_logo: "", network_id: "", encryption_type: "" },
        });
        dispatch({ type: STEP2_ENTITIES, payload: [] });
        dispatch({ type: STEP2_RELATIONSHIPS, payload: [] });
        navigate("/dapps");
    };
    // useEffect(() => {
    // const flowPane = document.querySelector(".react-flow__pane");
    // const dblclick = document.createEvent("MouseEvents");
    // dblclick.initEvent("dblclick", true, true);
    // flowPane.dispatchEvent(dblclick);
    // });
    function getEncriptTypeLabel(type) {
        if (type === "rsa") {
            return "RSA";
        }
        if (type === "aes") {
            return "AES";
        }
    }
    return (
        <>
            <Grid container className="newdapp_step3" style={{ margin: "32px" }}>
                <Grid item xs={3} md={3} lg={3}>
                    <span className="img_avata">
                        <img src={step1Data.dapp_logo} alt="" />
                    </span>
                </Grid>
                <Grid container xs={8} >
                    <Grid xs={2} item>
                        <p>
                            <span style={{ opacity: "0.65" }}>Name</span>
                            <br />
                            <b>{step1Data.dapp_name}</b>
                        </p>
                    </Grid>
                    <Grid xs={6} item>
                        <p>
                            <span style={{ opacity: "0.65" }}>Network</span>
                            <br />
                            <b>{step1Data.network_id}</b>
                        </p>
                    </Grid>
                    <Grid xs={4} item>
                        <p>
                            <span style={{ opacity: "0.65" }}>Encrypt type</span>
                            <br />
                            <b>{getEncriptTypeLabel(step1Data.encryption_type)}</b>
                        </p>
                    </Grid>
                    <Grid xs={4} item>
                        <p>
                            <span style={{ opacity: "0.65" }}>Description</span>
                            <br />
                            <b>{step1Data.dapp_description}</b>
                        </p>
                    </Grid>
                </Grid>
            </Grid>
            <hr />
            <div style={{ margin: "16px" }}>
                <b style={{ color: "#8CB8D8" }}>BUSINESS CONFIG</b>
            </div>
            <div>
                <Step3Diagram />
            </div>
            <Grid container marginBottom= "16px">
                <Grid xs={4}></Grid>
                <Grid xs={4} display="flex">
                    <Grid xs={5}>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => props.jumpToStep(1)}
                            style={{ width: "110px", height: "36px" }}
                        >
                            {"Back"}
                        </Button>
                    </Grid>
                    <Grid xs={2}></Grid>
                    <Grid xs={5}>
                        <Button
                            onClick={() => hdCreateDApp()}
                            variant="contained"
                            color="primary"
                            style={{ width: "110px", height: "36px" }}
                        >
                            {"Submit"}
                        </Button>
                    </Grid>
                </Grid>
                <Grid xs={4}></Grid>
            </Grid>
        </>
    );
}
