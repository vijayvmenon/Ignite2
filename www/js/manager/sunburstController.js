angular.module('ignite2.managerDashboard')

.controller('sunburstCntrl', ['$scope','$http','$filter','$ionicPopup','localStorageService', 'manProdSvc','$stateParams', '$state', function($scope,$http,$filter,$ionicPopup,localStorageService,manProdSvc,$stateParams,$state){

    $scope.options = {
            chart: {
                type: 'sunburstChart',
                height: 450,
                color: d3.scale.category20c(),
                duration: 250,
                margin : {
                    top:30,
                    left:0 
                }              
              },
          title: {
        enable: true,
        text: 'DC INVENTORY COST SUMMARY',
        css: {
            'text-align': 'left',
            'margin': '10px 13px 0px 7px',
            'font-size':'16px',
            'color':'#29B4B6',
            'font-width':'bold',
            'font-family':'segoe ui'
        }

        }
    };

      if (platform != "windows") {
            console.log('reached here');
            $scope.options.chart.height=600;
            $scope.options.chart.width=425;
          $scope.options.chart.margin.top=0;
            //  $scope.options.chart.margin.right=10;
         }

     $scope.data = [{

            "name": "DC-1234",

            "children": [
                {
                    "name": "Meat",
                    "children": [
                        {
                            "name": "Fresh",
                            "children": [
                                {"name": "Chicken", "size": 3938},
                                {"name": "Fish", "size": 3812},
                                {"name": "RedMeat", "size": 6714},
                                {"name": "Turkey", "size": 743}
                            ], "size": 15207
                        },
                        {
                            "name": "Frozen",
                            "children": [
                                {"name": "Fish", "size": 3534},
                                {"name": "FrozedRibs", "size": 5731},
                                {"name": "Pork", "size": 7840},
                                {"name": "Chicken", "size": 5914},
                                {"name": "Prawns", "size": 3416}
                            ], "size": 26435
                        },
                        {
                            "name": "Organic",
                            "children": [
                                {"name": "Chicken", "size": 7074}
                            ], "size": 7074
                        }
                    ], "size": 48716
                },


                {
                    "name": "Produce",
                    "children": [
                        {"name": "Speical Water Melons", "size": 17010},
                        {"name": "Seasonal grapes", "size": 5842},
                        {
                            "name": "Vegetables",
                            "children": [
                                {"name": "Onions", "size": 1983},
                                {"name": "Tomatoes", "size": 2047},
                                {"name": "Squash", "size": 1375},
                                {"name": "Carrots", "size": 8746},
                                {"name": "Beans", "size": 2202},
                                {"name": "Potatoes", "size": 1382},
                                {"name": "Cabbage", "size": 1629},
                                {"name": "Parsley", "size": 1675},
                                {"name": "Cucumber", "size": 2042}
                            ], "size": 38456
                        },
                        {"name": "Seasonal plums", "size": 1041},
                        {
                            "name": "Fruits",
                            "children": [
                                {"name": "Apples", "size": 1983},
                                {"name": "Grapes", "size": 2047},
                                {"name": "Pineapple", "size": 1375},
                                {"name": "Lemons", "size": 8746},
                                {"name": "Mangoe", "size": 2202},
                                {"name": "Cherry", "size": 1382},
                                {"name": "Melons", "size": 1629}
                            ], "size": 45643
                        },
                        {
                            "name": "Organic",
                            "children": [
                                {"name": "Farm grown Oranges", "size": 1983},
                                {"name": "Strawberry", "size": 2047},
                                {"name": "Tomatoes", "size": 1375},
                                {"name": "Kiwi", "size": 8746},
                                {"name": "Melons", "size": 1629}
                            ], "size": 67545
                        }
                        ], "size": 65478
                        
                },


                {
                    "name": "Dairy Deli",
                    "children": [
                        {
                            "name": "Organic",
                            "children": [
                                {"name": "Milk", "size": 721},
                                {"name": "Egg", "size": 4294},
                                {"name": "FlavouredMilk", "size": 9800}
                            ], "size": 15207
                        },
                        {"name": "Milk", "size": 1759},
                        {"name": "Cream", "size": 2165},
                        {"name": "Cheese", "size": 586},
                        {"name": "Butter", "size": 3331},
                        {"name": "Egg", "size": 772},
                        {"name": "Yoghurt", "size": 3322}
                    ], "size": 98765
                },


                {
                    "name": "Hazmat",
                    "children": [
                        {"name": "DirtySprite", "size": 8833},
                        {"name": "LinenSprite", "size": 1732},
                        {"name": "RectySprite", "size": 3623},
                        {"name": "ExtSprite", "size": 10066}
                    ], "size": 20876
                },


                {
                    "name": "GiftCards",
                    "children": [
                        {"name": "FlareVis", "size": 41160}
                    ], "size": 41160
                },


                {
                    "name": "Automobiles",
                    "children": [
                        {"name": "DragForce", "size": 1082},
                        {"name": "GravityForce", "size": 1336},
                        {"name": "IForce", "size": 319},
                        {"name": "NBodyForce", "size": 10498},
                        {"name": "Particle", "size": 2822},
                        {"name": "Simulation", "size": 9983},
                        {"name": "Spring", "size": 2213},
                        {"name": "SpringForce", "size": 1681}
                    ], "size": 30123
                },


                {
                    "name": "Ambient",
                    "children": [
                        {"name": "Choclates", "size": 1616},
                        {"name": "Breads", "size": 1027},
                        {"name": "Chips", "size": 3891},
                        {"name": "Sauce", "size": 891},
                        {"name": "Rice", "size": 2893},
                        {"name": "Beans", "size": 5103},
                        {"name": "Corns", "size": 3677},
                        {"name": "Count", "size": 781},
                        {"name": "IsA", "size": 4141},
                        {"name": "Spices", "size": 933}
                    ], "size": 29875
                },


                {
                    "name": "General",
                    "children": [
                        {"name":"ABSORBIT  ", "size":   0   },
                        {"name":"ACEITE", "size":   82524.94    },
                        {"name":"ACTII PICA", "size":   2040.65 },
                        {"name":"ADES 4PK  ", "size":   109.8   },
                        {"name":"AJONJOLI  ", "size":   1874    },
                        {"name":"ALICATE ", "size":   18652.8 },
                        {"name":"ALPISTE ", "size":   18793.72    },
                        {"name":"ALT BIKINI", "size":   12184.7 },
                        {"name":"ALT CAMI  ", "size":   5545.1  },
                        {"name":"ALT PANTY ", "size":   19796.35    },
                        {"name":"ANDRE BRUT", "size":   5144.82 },
                        {"name":"ANDRE ROSE", "size":   33441.33    },
                        {"name":"APLICADOR ", "size":   846.56  },
                        {"name":"AQUASAFE  ", "size":   955.2   },
                        {"name":"ARROZ ROJO", "size":   51935.2 },
                        {"name":"AU CAJETA ", "size":   776.18  },
                        {"name":"AU CARACOL", "size":   2236    },
                        {"name":"AU ELOTE  ", "size":   174445.01   },
                        {"name":"AU LETRA  ", "size":   208 },
                        {"name":"AU PLUMA  ", "size":   416 },
                        {"name":"AVE ACEITE", "size":   3888    },
                        {"name":"AW RELOJ  ", "size":   1909.6  },
                        {"name":"AZUCARERA ", "size":   169.16  },
                        {"name":"B CREY TIN", "size":   890.7   },
                        {"name":"BALON CARS", "size":   13916   },
                        {"name":"BAR CROMO ", "size":   4262.94 },
                        {"name":"BARBERA ", "size":   1716.95 },
                        {"name":"BARDAHL 2 ", "size":   32.1    },
                        {"name":"BC CONJ BA", "size":   7776    },
                        {"name":"BC CONJ BO", "size":   13770   },
                        {"name":"BCR 3 PACK", "size":   792.9   },
                        {"name":"BEE MOVIL ", "size":   4840    },
                        {"name":"BENZAL GEL", "size":   3273    },
                        {"name":"BIORE DEEP", "size":   1089.32 },
                        {"name":"BLOCK YOGA", "size":   2760    },
                        {"name":"BOLSA CONO", "size":   1200    },
                       {"name":"BOLSA DAMA", "size":   0   },
                        {"name":"BOLSA MIX ", "size":   667.64  },
                        {"name":"BOLSAS", "size":   1788    },
                        {"name":"BOOST ", "size":   76896.97    },
                        {"name":"BOWL  ", "size":   457.73  },
                        {"name":"BOWL AZUL ", "size":   2099.61 },
                        {"name":"BOWL CARS ", "size":   216 },
                        {"name":"BOWL SANTA", "size":   0   },
                        {"name":"BOWL VERDE", "size":   372 },
                        {"name":"BRILLO", "size":   9488.9  },
                        {"name":"BROCHE", "size":   0   },
                        {"name":"BUFANDA ", "size":   35683.02    },
                        {"name":"BULBO TRAD", "size":   583.98  },
                        {"name":"BV GRANDE ", "size":   56566.8 },
                        {"name":"BV MEDIANA", "size":   45018   },
                        {"name":"C&CP BLUSA", "size":   2340    },
                        {"name":"C&CP CAPRI", "size":   35095.06    },
                        {"name":"CABESLABON", "size":   63204.9 },
                        {"name":"CABJUMBO  ", "size":   169144.8    },
                        {"name":"CABPIEL ", "size":   69420.06    },
                        {"name":"CABTEXTIL ", "size":   16054.51    },
                        {"name":"CAJETA", "size":   3230.08 },
                        {"name":"CANASTA ", "size":   2.43    },
                        {"name":"CANNON TIN", "size":   58647.66    },
                        {"name":"CANSILMED ", "size":   32109.02    },
                        {"name":"CARDISAN  ", "size":   763.84  },
                        {"name":"CARGOS", "size":   174.4   },
                        {"name":"CASCABELES", "size":   1279.8  },
                        {"name":"CASINO TIN", "size":   29660.02    },
                        {"name":"CC PONCHO ", "size":   78988.25    },
                        {"name":"CCP WRAP  ", "size":   12080.46    },
                        {"name":"CENTRUM ", "size":   38813.58    },
                        {"name":"CEREZA KS ", "size":   0   },
                        {"name":"CHIA  ", "size":   3877.5  },
                        {"name":"CLA ", "size":   15245.09    },
                        {"name":"CO&CO BATA", "size":   81349.2 },
                        {"name":"CO&CO SET ", "size":   3096    },
                        {"name":"COMPLEJO B", "size":   45090.98    },
                        {"name":"CONDON OK ", "size":   50434.56    },
                        {"name":"CONDONES M", "size":   15840.85    },
                        {"name":"COPA SNOW ", "size":   388.94  },
                        {"name":"CORTAUNAS ", "size":   172.43  },
                        {"name":"CORTINERO ", "size":   1836    },
                        {"name":"COSMO BRA ", "size":   442 },
                        {"name":"COSTAL BOX", "size":   0   },
                        {"name":"CREATINA  ", "size":   4450.43 },
                        {"name":"CUBARAIMA ", "size":   0   },
                        {"name":"CUCHARA TE", "size":   10093.44    },
                        {"name":"DAMAMODA  ", "size":   32109.02    },
                        {"name":"DB CANASTA", "size":   137250  },
                        {"name":"DC SET ONE", "size":   145.48  },
                        {"name":"DG GRANDE ", "size":   2889.3  },
                        {"name":"DG LUNGO  ", "size":   27448.35    },
                        {"name":"DG MOCHA  ", "size":   802.62  },
                        {"name":"DG PANTIM ", "size":   0   },
                        {"name":"DH PINA ", "size":   2989.44 },
                       {"name":"DH SUIZO  ", "size":   5646.72 },
                        {"name":"DIASPOT ", "size":   112424  },
                        {"name":"DISCO 5 LB", "size":   17074.8 },
                        {"name":"DNS TOP RA", "size":   0   },
                        {"name":"DOG BOWL P", "size":   12060   },
                        {"name":"DOGGYPLATO", "size":   4554.24 },
                        {"name":"DOVE MILK ", "size":   127.84  },
                        {"name":"DR PEPPER ", "size":   5644.7  },
                        {"name":"DRS TIN ", "size":   23328   },
                        {"name":"DV PET UVA", "size":   7633.38 },
                        {"name":"EMBUDO", "size":   78.44   },
                        {"name":"EQ COBRE  ", "size":   3363.36 },
                        {"name":"ESF FROZEN", "size":   876.93  },
                        {"name":"ESF NEMO  ", "size":   0   },
                        {"name":"ESMALTE ", "size":   0   },
                        {"name":"EVIAN AGUA", "size":   4700.16 },
                        {"name":"EX PALMITO", "size":   2448    },
                        {"name":"EXTINTOR  ", "size":   0   },
                        {"name":"F&F RC 116", "size":   3965.46 },
                        {"name":"FERMODUAL ", "size":   2385.3  },
                        {"name":"FIGURA MDF", "size":   0   },
                        {"name":"FLIPY 45GR", "size":   195 },
                        {"name":"FLO 9300  ", "size":   5040    }
                    ], "size": 497653475
                },
                
                
                
                {
                  "name":"Personal Care",
                  "children": [
                  {"name": " AXE FUSION     "," size":          3385.8 },
                  {"name": " AXE AEROSO     "," size":          46719.24         },
                  {"name": " AXE BW DAR     "," size":          1495.68           },
                  {"name": " AXE BW APO     "," size":          1744.96           },
                  {"name": " AXE BW BLA     "," size":          249.28 },
                  {"name": " AXE DARK R      "," size":          1197    },
                  {"name": " AXE AER YO      "," size":          1297.2 },
                  {"name": " AXE EXCITE      "," size":          1861.31           },
                  {"name": " AXE APOLLO     "," size":          6448.26           },
                  {"name": " MF AXE COM     "," size":          219.74 },
                  {"name": " AXE PEACE       "," size":          1039.31           },
                  {"name": " AXE AER AP      "," size":          1172.13           },
                  {"name": " AXE STICK        "," size":          3078    },
                  {"name": " AXE ROLLON     "," size":          478.8   },
                  {"name": " AXE DARK S      "," size":          615.6   },
                  {"name": " AXE DARK T      "," size":          3882.12           },
                  {"name": " AXEL CONTR     "," size":          27268.56         },
                  {"name": " AXE LOC AD      "," size":          0          },
                  {"name": " AXE LOCION     "," size":          0          },
                  {"name": " AXE LOC SI       "," size":          0          },
                  {"name": " AXE 2P AER      "," size":          0          },
                  {"name": " AXE LOC 2P      "," size":          439749.6         },
                  {"name": " PALMOLIVE       "," size":          166766.5         },
                  {"name": " PALMOLIV M     "," size":          43421.47         },
                  {"name": " PALMOLIVEL     "," size":          33037.38         },
                  {"name": " PALMOLIV G      "," size":          7974.54           },
                  {"name": " PALMOLIV C      "," size":          12531.42         },
                  {"name": " PALMOLIV Y      "," size":          14240.25         },
                  {"name": " PALMOLIV J       "," size":          3987.27           },
                  {"name": " JL PALMOLI       "," size":          2833.5 },
                  {"name": " PALMO MEN      "," size":          2113.08           },
                  {"name": " PALMOLIV B      "," size":          17088.3           },
                  {"name": " ORALB CLAS     "," size":          24510.88         },
                  {"name": " ORAL-B MAN     "," size":          894.96 },
                  {"name": " ORAL B ESS      "," size":          2679.84           },
                  {"name": " ORALB COMP     "," size":          1446.48           },
                  {"name": " ORALB PROS     "," size":          8346.2 },
                  {"name": " ORALB GING     "," size":          9463.37           },
                  {"name": " ORALB HILO      "," size":          48494.46         },
                  {"name": " ORALB MENT     "," size":          7795.52           },
                  {"name": " ORAL STAGE     "," size":          2981.52           },
                  {"name": " ORALB STAG     "," size":          37567.26         },
                  {"name": " ORAL B SEN      "," size":          2927.4 },
                  {"name": " ORAL B COM     "," size":          2602.24           },
                  {"name": " CLORALEX M     "," size":          222612.77       },
                  {"name": " CASA CORAL     "," size":          21219.6           },
                  {"name": " CLORALEX V     "," size":          9135    },
                  {"name": " CLORALEX B     "," size":          30132  },
                  {"name": " CLORALEX R     "," size":          334503.88       },
                  {"name": " ACE FLORAL      "," size":          16866.75         },
                  {"name": " CLORALEX D     "," size":          38770.7           },
                  {"name": " CLORALEX C     "," size":          18253.8           },
                  {"name": " CLORALEX P      "," size":          35290.44         },
                  {"name": " CLORALEX A     "," size":          15246  },
                  {"name": " A&H FLORAL     "," size":          41122.4           },
                  {"name": " CLORALEX F      "," size":          22014.24         },
                  {"name": " FOTORAL 25     "," size":          4016.04           },
                  {"name": " MEJORAL 50     "," size":          8998.15           },
                  {"name": " MEJORALITO     "," size":          45913.41         },
                  {"name": " SPRAY ORAL      "," size":          1478.4 },
                  {"name": " MORALITOS      "," size":          4576    },
                  {"name": " PANTENE SH     "," size":          54016.9           },
                  {"name": " PANTENE AC     "," size":          15967.9           },
                  {"name": " PANTENE CR     "," size":          6577.85           },
                  {"name": " PANTENE MO    "," size":          3004.96           },
                  {"name": " PANTENE RE     "," size":          507.1   },
                  {"name": " PANTENE 2N     "," size":          16549.18         },
                  {"name": " PANTENE EX     "," size":          0          },
                  {"name": " PANTENE AM     "," size":          6819.95           },
                  {"name": " PANTENE CP     "," size":          5247.17           },
                  {"name": " PANTENE 2       "," size":          5378.8 },
                  {"name": " PANTENE TR     "," size":          0          },
                  {"name": " PANTENE DA     "," size":          496.54 },
                    ], "size": 960462
                },
                
                {
                    "name": "HouseHold",
                    "children": [
                        {"name": "      DIAL CLEAN      "," size":          2135.1 },
                        {"name": "      ROS CLEAN       "," size":          660.24 },
                        {"name": "      LCLEAN TEL      "," size":          381.6   },
                        {"name": "      OXICLEAN V      "," size":          43830  },
                        {"name": "      MF RCLEAN       "," size":          441      },
                        {"name": "      RCLEAN REG     "," size":          100625            },
                        {"name": "      CLEAN ARMY     "," size":          918      },
                        {"name": "      ECOCLEAN C     "," size":          13869  },
                        {"name": "      ECOCLEAN E     "," size":          2555.5 },
                        {"name": "      OXI CLEAN        "," size":          29526.48         },
                        {"name": "      CG CLEAN L      "," size":          3600.72           },
                        {"name": "      CG CLEAN O      "," size":          6606.32           },
                        {"name": "      CG CLEAN P      "," size":          2205.44           },
                        {"name": "      ECOCLEAN F     "," size":          3250    },
                        {"name": "      LCLEAN TRA      "," size":          618.84 },
                        {"name": "      96PCICLEAN     "," size":          237312            }

                    ], "size": 448535
                 }, 
                 
                 
                 {
                    "name": "Clothing",
                    "children": [
                        {"name":"100 CO    ", "size":   2318    },
                        {"name":"185/60R14 ", "size":   9360    },
                        {"name":"725 BATA  ", "size":   5526    },
                        {"name":"725 BLUSA ", "size":   2976    },
                        {"name":"725 CAMI  ", "size":   8850.6  },
                        {"name":"725 CAMISA", "size":   301545.09   },
                        {"name":"725 CHALE ", "size":   0   },
                        {"name":"725 CRUSO ", "size":   0   },
                        {"name":"725 PANAL ", "size":   2019.6  },
                        {"name":"725 PANT  ", "size":   2142.3  },
                        {"name":"725 PIJAMA", "size":   29820   },
                        {"name":"725 PLAY  ", "size":   708 },
                        {"name":"725 PLAYE ", "size":   65571.86    },
                        {"name":"725 POLO  ", "size":   232720.95   },
                        {"name":"725 PONCHO", "size":   204140.59   },
                        {"name":"725 PQ3 BA", "size":   10140   },
                        {"name":"725 PQ3 BO", "size":   50700   },
                        {"name":"725 RELOJ ", "size":   1284.8  },
                        {"name":"725 SUETER", "size":   200035.5    },
                        {"name":"725 TIN BA", "size":   1980    },
                        {"name":"725 TIN BO", "size":   480 },
                        {"name":"80PCLATAS ", "size":   5581.35 },
                        {"name":"9985336 ", "size":   0   },
                        {"name":"FOL BIKINI", "size":   22106.2 },
                        {"name":"FOL BOXER ", "size":   1188.84 },
                        {"name":"FOL CTE FR", "size":   0   },
                        {"name":"FOL PACK  ", "size":   42548.16    },
                        {"name":"FOL PANTA ", "size":   5083.68 },
                        {"name":"FOL PANTY ", "size":   841.2   },
                        {"name":"FOL SUDA  ", "size":   162156.84   },
                        {"name":"FOL SUDADE", "size":   335621.23   },
                        {"name":"FOL TIN ", "size":   41868   },
                        {
                            "name": "Seasonal",
                            "children": [
                                {"name": "Xmas Special", "size": 721},
                                {"name": "New year Eve Sales", "size": 4294},
                                {"name": "Thanks Giving discount", "size": 9800}
                            ], "size": 15207
                        },
                        {"name":"FOL TRUSA ", "size":   3752.44 },
                        {"name":"FOLDER", "size":   660 },
                        {"name":"FORRO ", "size":   541.8   }

                    ], "size": 453475
                 }

            ], "size": 502876114

        }];

$scope.total_dc_inventory=$scope.data[0].size;

}])



