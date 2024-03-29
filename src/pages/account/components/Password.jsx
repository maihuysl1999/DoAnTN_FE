import { useEffect, useState } from "react";
import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { UPDATE_PASSWORD } from "src/redux/User/Settings/actionTypes";
import { UPDATE_PASSWORD_SUCCESSFUL } from "src/redux/User/Settings/actionTypes";
import { SEND_VERIFY } from "src/redux/User/Settings/actionTypes";
import { VERIFY_PASSWORD } from "src/redux/User/Settings/actionTypes";
import { OPEN_WARNING_ALERT } from "src/redux/User/Alerts/actionTypes";

export default function Password() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = useSelector((state) => state.Setting.logout);
    const user = useSelector((state) => state.User.user);
    const [profile, setProfile] = useState();
    const [verify, setVerify] = useState("");
    const [pwdError, setPwdError] = useState(false);
    const [forgotPwd, setForgotPwd] = useState(false);
    const [verifyForgot, setVerifyForgot] = useState(false);
    const [tempPwd, setTempPwd] = useState("");
    const [otp, setOtp] = useState();

    useEffect(() => {
        if (logout) {
            dispatch({ type: UPDATE_PASSWORD_SUCCESSFUL, payload: false });
            navigate("/login");
        }
    }, [logout]);
    const handlePassword = (e) => {
        setTempPwd(e.target.value);
        setProfile({ ...profile, new_password: e.target.value });
        if (
            validator.isStrongPassword(e.target.value, {
                minLength: 8,
                minNumbers: 1,
                minSymbols: 0,
                minUppercase: 1,
                minLowercase: 1,
            })
        ) {
            setPwdError(true);
        } else {
            setPwdError(false);
        }
    };

    const handleEditPassword = () => {
        dispatch({ type: UPDATE_PASSWORD, payload: { user_id: user.user_id, data: profile } });
        dispatch({
            type: OPEN_WARNING_ALERT,
            payload: {
                message: "Request is being processed",
            },
        });
    };
    const handleVerifyPwd = () => {
        setVerifyForgot(true);
        dispatch({ type: SEND_VERIFY, payload: { user_id: user.user_id } });
        dispatch({
            type: OPEN_WARNING_ALERT,
            payload: {
                message: "Request is being processed",
            },
        });
    };
    const handleOTP = (e) => {
        setOtp(e.target.value);
    };
    const handleVerifyOTP = () => {
        dispatch({
            type: VERIFY_PASSWORD,
            payload: { user_id: user.user_id, otp: otp, password: profile && profile.new_password },
        });
        dispatch({
            type: OPEN_WARNING_ALERT,
            payload: {
                message: "Request is being processed",
            },
        });
    };

    return (
        <>
            <Grid style={{ textAlign: "center", margin: "16px" }}>
                <h2>Change Password</h2>
            </Grid>
            <Grid spacing={2} style={{ display: "flex", justifyContent: "center" }}>
                <Grid>
                    <Grid>
                        <TextField
                            type="password"
                            size="small"
                            label="Old password"
                            variant="filled"
                            fullWidth
                            onChange={(e) => setProfile({ ...profile, old_password: e.target.value })}
                        />
                        <br />
                        <br />
                        <TextField
                            value={profile && profile.password}
                            onChange={(e) => handlePassword(e)}
                            size="small"
                            label="Password"
                            variant="filled"
                            fullWidth
                            type="password"
                            helperText={!pwdError ? "Must have uppercase, lowercase, number, minimum length 8" : " "}
                        />

                        <TextField
                            type="password"
                            helperText={!(profile && verify === profile["new_password"]) ? "Password mismatch" : " "}
                            size="small"
                            label="Verify password"
                            variant="filled"
                            fullWidth
                            onChange={(e) => setVerify(e.target.value)}
                        />
                        <br />
                        <br />
                        <div style={{ display: "flex", justifyContent: "right" }}>
                            <Button
                                disabled={!pwdError || !(verify === profile?.new_password) || !profile?.old_password}
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="account btn-disable btn-editProfile"
                                onClick={() => handleEditPassword()}
                            >
                                Change
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            <Grid style={{ display: !forgotPwd ? "none" : "" }}>
                <Grid className="rowEditProfile d-center" style={{ display: verifyForgot ? "none" : "" }}>
                    <Grid className="col-md-6">
                        <TextField
                            fullWidth
                            value={profile && profile.password}
                            onChange={(e) => handlePassword(e)}
                            size="small"
                            label="Password"
                            variant="filled"
                            className="input"
                            type="password"
                            helperText={!pwdError ? "Must have uppercase, lowercase, number, minimum length 8" : " "}
                        />
                        <br />
                        <Button variant="contained" color="primary" onClick={() => handleVerifyPwd()}>
                            Verify
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid className="col-md-12 d-center" style={{ display: !forgotPwd ? "none" : "" }}>
                <Grid className="rowEditProfile d-center" style={{ display: !verifyForgot ? "none" : "" }}>
                    <Grid className="col-md-6">
                        <TextField
                            value={profile && profile.password}
                            onChange={(e) => handleOTP(e)}
                            size="small"
                            label="OTP Code"
                            variant="filled"
                            className="input"
                            type="password"
                        />
                        <br />
                        <br />
                        <Button variant="contained" color="primary" onClick={() => handleVerifyOTP()}>
                            OK
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{ height: "100px" }}></div>
        </>
    );
}
