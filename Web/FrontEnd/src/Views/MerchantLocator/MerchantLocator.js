import React,{useEffect, useState} from 'react'
import Map from './Map'
import { Row, Col, Form, Button,Input} from 'antd';
import API from '../../utils/baseUrl';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDD_LZoOgt7th9UQVMl2nGbJ3_N-TOvRz4")

function MerchantLocator() {

    const [Name, setName] = useState("Starbucks");
    const [Vname, setVname] = useState("");
    const [Lat, setLat] = useState("1.3521");
    const [Lng, setLng] = useState("103.82");
    const [VisaMerch, setVisaMerch] = useState([]);
    const [Visell, setVisell] = useState([]);
    const [VisellPos, setVisellPos] = useState([]);

    useEffect(() => {
        API.post('api/merchant/getAll')
        .then((res)=>{
            if (res.data.success==true){
                let all = []
                res.data.merchants.map(merchant=>{
                    Geocode.fromAddress(merchant.address).then(
                        response => {
                          const cord = response.results[0].geometry.location;
                          all.push(cord)
                          setVisell(all)
                        },
                        error => {
                          console.error(error);
                        }
                      );
                })
            }
        })
    }, [])

    const onNameChange = (event)=>{
        setName(event.currentTarget.value)
    }

    const onVnameChange= (event)=>{
        setVname(event.currentTarget.value)
    }

    const onMerchantSubmit = (event)=>{
        event.preventDefault();
        let body = {lat: Lat, lng:Lng, name:Name}
        API.post('api/merchantLocator/getAll',body)
            .then((res)=>{
                if (res.success == false) console.log("cannot fetch merchant")
                else{
                    let merchants = {}
                    merchants =res.data.data.merchantLocatorServiceResponse.response
                    if (merchants) setVisaMerch(merchants)
                }
            })
            .catch(err=>{
                console.log("cannot fetch merchant")
            })
    }

    const setCoord = (coord)=>{
        setLat(coord.lat.toString())
        setLng(coord.lng.toString())
    }

    const onVisellSubmit = (event)=>{
        event.preventDefault();
        let body = {searchTerm:Vname}
        API.post('api/merchant/getAll',body)
        .then((res)=>{
            if (res.data.success==true){
                let all = []
                res.data.merchants.map(merchant=>{
                    Geocode.fromAddress(merchant.address).then(
                        response => {
                          const cord = response.results[0].geometry.location;
                          all.push(cord)
                          setVisellPos(all)
                        },
                        error => {
                          console.error(error);
                        }
                      );
                })
            }
        })
    }

    return (
        <div>
            
            <Row gutter={16}>
                <Col span={12} >
                    <Map
                    setCoord={setCoord}
                    visaMerch = {VisaMerch}
                    visell = {Visell}
                    visellPos = {VisellPos}
                    />
                </Col>
                <Col span={12} >
                    <div style={{padding:'40px'}}>
                        <h2>Merchant Locator</h2>
                        <Form 
                            onSubmit={onMerchantSubmit} 
                            layout={'vertical'}
                            size={'large'}
                        >
                            <Form.Item label={<p style={{fontSize:'20px',marginBottom:'-18px'}}>Merchant Name</p>}>
                                <Input placeholder="merchant name" 
                                    onChange={onNameChange}
                                    value={Name}
                                />
                            </Form.Item>
                            <Button
                                onClick={onMerchantSubmit}
                            >
                                Search
                            </Button>
                        </Form>
                        <br/>
                        <br/>
                        <h2>Visell Locator</h2>
                        <Form 
                            onSubmit={onVisellSubmit} 
                            layout={'vertical'}
                            size={'large'}
                        >
                            <Form.Item label={<p style={{fontSize:'20px',marginBottom:'-18px'}}>Merchant Name</p>}>
                                <Input placeholder="Visell Merchant Name" 
                                    onChange={onVnameChange}
                                    value={Vname}
                                />
                            </Form.Item>
                            <Button
                                onClick={onVisellSubmit}
                            >
                                Search
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
         
        </div>
    )
}

export default MerchantLocator
