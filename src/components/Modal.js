const Modal = ({ country, onClose }) => (
    <div className="modal">
        <div className="modal-content">

            {/* Icon close */}
            <span className="close" onClick={onClose}>&times;</span> 

            {/* Modal header */}
            <div className="flex flex-col gap-2 mb-5">
                <div className="flex items-center gap-5">
                    <img className="rounded-lg" src={country.flags.png} title={country.name.common} height={60} alt={country.name.official} />
                    <div>
                        <p className="text-xl font-extrabold">{country.name.common}</p>
                        <p>{country.area.toLocaleString()} km<sup>2</sup></p>
                    </div>
                </div>
            </div>

            <hr />

            {/* Modal body */}
            {/* Name */}
            {country.name && <div className="flex flex-col gap-2 mb-2">
                <h4>Name</h4>
                <div className="flex">
                    <div className="basis-20">Common</div>
                    <div>: {country.name.common}</div>
                </div>
                <div className="flex">
                    <div className="basis-20">Offical</div>
                    <div>: {country.name.official}</div>
                </div>
                <div className="flex flex-col gap-2">
                    <div>Native Name</div>
                    <div className="mb-2">
                        {country.name.nativeName && Object.entries(country.name.nativeName).map(([key, value], index) => (
                            <div key={key} className="flex">
                                <div className="basis-20">{index + 1}. {key}</div>
                                <div className="flex-1 mb-2">
                                    {Object.entries(value).map(([key2, value2]) => (
                                        <div key={key2} className="flex">
                                            <div className="basis-20">{key2}</div>
                                            <div>: {value2}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>}

            {/* TLD */}
            {country.tld && <div className="flex mb-2">
                <h4 className="basis-20">tld</h4>
                <div>: {country.tld && country.tld.map(item => item).join(', ')}</div>
            </div>}

            {/* CCA2 */}
            {country.cca2 && <div className="flex mb-2">
                <h4 className="basis-20">cca2</h4>
                <div>: {country.cca2}</div>
            </div>}

            {/* CCN3 */}
            {country.ccn3 && <div className="flex mb-2">
                <h4 className="basis-20">ccn3</h4>
                <div>: {country.ccn3}</div>
            </div>}

            {/* CCA3 */}
            {country.cca3 && <div className="flex mb-2">
                <h4 className="basis-20">cca3</h4>
                <div>: {country.cca3}</div>
            </div>}

            {/* CIOC */}
            {country.cioc && <div className="flex mb-2">
                <h4 className="basis-20">cioc</h4>
                <div>: {country.cioc}</div>
            </div>}

            {/* Independent */}
            {country.independent && <div className="flex mb-2">
                <h4 className="basis-20">Independent</h4>
                <div>: {country.independent === true ? 'Yes' : 'No'}</div>
            </div>}

            {/* Status */}
            {country.status && <div className="flex mb-2">
                <h4 className="basis-20">Status</h4>
                <div>: {country.status}</div>
            </div>}

            {/* unMember */}
            {country.unMember && <div className="flex mb-2">
                <h4 className="basis-20">unMember</h4>
                <div>: {country.unMember === true ? 'Yes' : 'No'}</div>
            </div>}

            {/* Currencies */}
            {country.currencies && <div className="flex flex-col gap-2 mb-2">
                <h4>Currencies</h4>
                {
                    Object.entries(country.currencies).map(([key, value]) => (
                        <div key={key} className="flex">
                            <div className="basis-20">{key}</div>
                            <div className="flex-1">: {value.name}</div>
                        </div>
                    ))
                }
            </div>}

            {/* IDD */}
            {country.idd && country.idd.root && country.idd.suffixes && <div className="flex">
                <h4 className="basis-20 mb-2">IDD</h4>
                <div>: {country.idd && country.idd.root && country.idd.suffixes && country.idd.suffixes.map(suffix => country.idd.root + suffix).join(', ')}</div>
            </div>}

            {/* Capital */}
            {country.capital && <div className="flex">
                <h4 className="basis-20 mb-2">Capital</h4>
                <div>: {country.capital && country.capital.map(item => item).join(', ')}</div>
            </div>}

            {/* altSpellings */}
            {country.altSpellings && <div className="flex">
                <h4 className="basis-20 mb-2">altSpellings</h4>
                <div>: {country.altSpellings && country.altSpellings.map(item => item).join(', ')}</div>
            </div>}

            {/* Region */}
            {country.region && <div className="flex">
                <h4 className="basis-20 mb-2">Region</h4>
                <div>: {country.region}</div>
            </div>}

            {/* Subregion */}
            {country.subregion && <div className="flex">
                <h4 className="basis-20 mb-2">Subregion</h4>
                <div>: {country.subregion}</div>
            </div>}

            {/* Languages */}
            {country.languages && <div className="flex">
                <h4 className="basis-20 mb-2">Languages</h4>
                <div>: {country.languages && Object.values(country.languages).join(", ")}</div>
            </div>}

            {/* Translations */}
            {country.translations && <div className="flex">
                <h4 className="basis-20 mb-2">Translations</h4>
                <div className="flex-1 mb-2">
                    {country.translations && Object.entries(country.translations).map(([key, value], index) => (
                        <div key={key} className="flex">
                            <div className="basis-20">{index + 1}. {key}</div>
                            <div className="flex-1 mb-2">
                                {Object.entries(value).map(([key2, value2]) => (
                                    <div key={key2} className="flex">
                                        <div className="basis-20">{key2}</div>
                                        <div className="flex-1">: {value2}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>}

            {/* Latlng */}
            {country.latlng && <div className="flex">
                <h4 className="basis-20 mb-2">latlng</h4>
                <div>: {country.latlng && country.latlng.map(item => item).join(', ')}</div>
            </div>}

            {/* Landlocked */}
            {country.landlocked && <div className="flex mb-2">
                <h4 className="basis-20">Landlocked</h4>
                <div className="flex-1">: {country.landlocked === true ? 'Yes' : 'No'}</div>
            </div>}

            {/* Borders */}
            {country.borders && <div className="flex">
                <h4 className="basis-20 mb-2">Borders</h4>
                <div className="flex-1">: {country.borders && country.borders.map(item => item).join(', ')}</div>
            </div>}
            
            {/* Area */}
            {country.area && <div className="flex">
                <h4 className="basis-20 mb-2">Area</h4>
                <div className="flex-1">: {country.area.toLocaleString()} km<sup>2</sup></div>
            </div>}

            {/* Demonyms */}
            {country.demonyms && <div className="flex">
                <h4 className="basis-20 mb-2">Demonyms</h4>
                <div className="flex-1 mb-2">
                    {country.demonyms && Object.entries(country.demonyms).map(([key, value], index) => (
                        <div key={key} className="flex">
                            <div className="basis-20">{index + 1}. {key}</div>
                            <div className="flex-1 mb-2">
                                {Object.entries(value).map(([key2, value2]) => (
                                    <div key={key2} className="flex">
                                        <div className="basis-10">{key2}</div>
                                        <div className="flex-1">: {value2}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>}

            {/* Flag */}
            {country.flag && <div className="flex">
                <h4 className="basis-20 mb-2">Flag</h4>
                <div>: {country.flag}</div>
            </div>}

            {/* Maps */}
            {country.maps && <div className="flex flex-col gap-2 mb-2">
                <h4>Maps</h4>
                {
                    Object.entries(country.maps).map(([key, value]) => (
                        <div key={key} className="flex">
                            <div className="basis-20">{key}</div>
                            <div>: {value}</div>
                        </div>
                    ))
                }
            </div>}

            {/* Population */}
            {country.population && <div className="flex">
                <h4 className="basis-20 mb-2">Population</h4>
                <div>: {country.population.toLocaleString()}</div>
            </div>}

            {/* Gini */}
            {
                country.gini && <div className="flex flex-col gap-2 mb-2">
                    <h4>Gini</h4>
                    {
                        Object.entries(country.gini).map(([key, value]) => (
                            <div key={key} className="flex">
                                <div className="basis-20">{key}</div>
                                <div>: {value}</div>
                            </div>
                        ))
                    }
                </div>
            }

            {/* Fifa */}
            {country.fifa && <div className="flex">
                <h4 className="basis-20 mb-2">Fifa</h4>
                <div>: {country.fifa}</div>
            </div>}

            {/* Car */}
            {country.car && <div className="flex flex-col gap-2 mb-2">
                <h4>Car</h4>
                {
                    Object.entries(country.car).map(([key, value]) => (
                        <div key={key} className="flex">
                            <div className="basis-20">{key}</div>
                            <div>: {value}</div>
                        </div>
                    ))
                }
            </div>}

            {/* Timezones */}
            {country.timezones && <div className="flex">
                <h4 className="basis-20 mb-2">Timezones</h4>
                <div>: {country.timezones && country.timezones.map(item => item).join(', ')}</div>
            </div>}

            {/* Continents */}
            {country.continents && <div className="flex">
                <h4 className="basis-20 mb-2">Continents</h4>
                <div>: {country.continents && country.continents.map(item => item).join(', ')}</div>
            </div>}

            {/* Flags */}
            {country.flags && <div className="flex flex-col gap-2 mb-2">
                <h4>Flags</h4>
                {
                    Object.entries(country.flags).map(([key, value]) => (
                        <div key={key} className="flex">
                            <div className="basis-20">{key}</div>
                            <div className="flex-1">: {value}</div>
                        </div>
                    ))
                }
            </div>}

            {/* coatOfArms */}
            {country.coatOfArms && <div className="flex flex-col gap-2 mb-2">
                <h4>Coat Of Arms</h4>
                {
                    Object.entries(country.coatOfArms).map(([key, value]) => (
                        <div key={key} className="flex">
                            <div className="basis-20">{key}</div>
                            <div>: {value}</div>
                        </div>
                    ))
                }
            </div>}

            {/* Capital Info */}
            {country.capitalInfo && <div className="flex flex-col gap-2 mb-2">
                <h4>Capital Info</h4>
                {
                    Object.entries(country.capitalInfo).map(([key, value]) => (
                        <div key={key} className="flex">
                            <div className="basis-20">{key}</div>
                            <div>: {value.map(item => item).join(', ')}</div>
                        </div>
                    ))
                }
            </div>}

            {/* StartOfWeek */}
            {country.startOfWeek && <div className="flex">
                <h4 className="basis-20 mb-2">Start Of Week</h4>
                <div>: {country.startOfWeek}</div>
            </div>}

            <hr />

            {/* Modal footer */}
            <button className="px-3 py-2 bg-electric-blue text-white border-none rounded cursor-pointer" onClick={onClose}>Close</button>
        </div>
    </div>
);

export default Modal;