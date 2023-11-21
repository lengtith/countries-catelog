const Modal = ({ country, onClose }) => (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
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

            {/* Name */}
            <div className="flex flex-col gap-2 mb-2">
                <h4>Name</h4>
                <div className="flex">
                    <div className="basis-20">Common</div>
                    <div>: {country.name.common}</div>
                </div>
                <div className="flex">
                    <div className="basis-20">Offical</div>
                    <div>: {country.name.official}</div>
                </div>
                <div className="flex">
                    <div className="basis-20">Native Name</div>
                    <div>: {country.name.nativeName && Object.keys(country.name.nativeName).map(language => country.name.nativeName[language].official).join(', ')}</div>
                </div>
            </div>

            {/* TLD */}
            <div className="flex mb-2">
                <h4 className="basis-20">tld</h4>
                <div>: {country.tld && country.tld.map(item => item).join(', ')}</div>
            </div>

            {/* CCA2 */}
            <div className="flex mb-2">
                <h4 className="basis-20">cca2</h4>
                <div>: {country.cca2}</div>
            </div>

            {/* CCN3 */}
            <div className="flex mb-2">
                <h4 className="basis-20">ccn3</h4>
                <div>: {country.ccn3}</div>
            </div>

            {/* CCA3 */}
            <div className="flex mb-2">
                <h4 className="basis-20">cca3</h4>
                <div>: {country.cca3}</div>
            </div>

            {/* CIOC */}
            <div className="flex mb-2">
                <h4 className="basis-20">cioc</h4>
                <div>: {country.cioc}</div>
            </div>

            {/* Independent */}
            <div className="flex mb-2">
                <h4 className="basis-20">Independent</h4>
                <div>: {country.independent === true ? 'Yes' : 'No'}</div>
            </div>

            {/* Status */}
            <div className="flex mb-2">
                <h4 className="basis-20">Status</h4>
                <div>: {country.status}</div>
            </div>

            {/* unMember */}
            <div className="flex mb-2">
                <h4 className="basis-20">unMember</h4>
                <div>: {country.independent === true ? 'Yes' : 'No'}</div>
            </div>

            {/* Currencies */}
            <div className="flex flex-col gap-2 mb-2">
                <h4>Currencies</h4>
                <div className="flex">
                    <div className="basis-20">XOF</div>
                    <div>: {country.currencies.XOF && country.currencies.XOF.name}</div>
                </div>
                {
                    Object.entries(country.currencies).map(([key, value]) => (
                        <div className="flex">
                            <div className="basis-20">{key}</div>
                            <div>: {value.name}</div>
                        </div>
                    ))
                }
            </div>

            {/* IDD */}
            <div className="flex">
                <h4 className="basis-20 mb-2">IDD</h4>
                <div>: {country.idd && country.idd.root && country.idd.suffixes && country.idd.suffixes.map(suffix => country.idd.root + suffix).join(', ')}</div>
            </div>

            {/* Capital */}
            <div className="flex">
                <h4 className="basis-20 mb-2">Capital</h4>
                <div>: {country.capital && country.capital.map(item => item).join(', ')}</div>
            </div>

            {/* altSpellings */}
            <div className="flex">
                <h4 className="basis-20 mb-2">altSpellings</h4>
                <div>: {country.altSpellings && country.altSpellings.map(item => item).join(', ')}</div>
            </div>

            {/* Region */}
            <div className="flex">
                <h4 className="basis-20 mb-2">Region</h4>
                <div>: {country.region}</div>
            </div>

            {/* Subregion */}
            <div className="flex">
                <h4 className="basis-20 mb-2">Subregion</h4>
                <div>: {country.subregion}</div>
            </div>

            {/* Languages */}
            <div className="flex">
                <h4 className="basis-20 mb-2">Languages</h4>
                <div>: {country.languages && Object.values(country.languages).join(", ")}</div>
            </div>

            {/* Translations */}
            <div className="flex">
                <h4 className="basis-20 mb-2">Translations</h4>
                <div className="flex-1">: {country.translations && Object.entries(country.translations).map(([key, value]) => `(${key}:${value.common})`).join(", ")}</div>
            </div>

            {/* Flag */}
            <div className="flex">
                <h4 className="basis-20 mb-2">Flag</h4>
                <div>: {country.flag}</div>
            </div>

            {/* Maps */}
            <div className="flex flex-col gap-2 mb-2">
                <h4>Maps</h4>
                {
                    Object.entries(country.maps).map(([key, value]) => (
                        <div className="flex">
                            <div className="basis-20">{key}</div>
                            <div>: {value}</div>
                        </div>
                    ))
                }
            </div>

            {/* Population */}
            <div className="flex">
                <h4 className="basis-20 mb-2">Population</h4>
                <div>: {country.population.toLocaleString()}</div>
            </div>

            {/* Gini */}
            {
                country.gini && <div className="flex flex-col gap-2 mb-2">
                    <h4>Gini</h4>
                    {
                        Object.entries(country.gini).map(([key, value]) => (
                            <div className="flex">
                                <div className="basis-20">{key}</div>
                                <div>: {value}</div>
                            </div>
                        ))
                    }
                </div>
            }

            {/* Fifa */}
            <div className="flex">
                <h4 className="basis-20 mb-2">Fifa</h4>
                <div>: {country.fifa}</div>
            </div>

            {/* Car */}
            <div className="flex flex-col gap-2 mb-2">
                <h4>Car</h4>
                {
                    Object.entries(country.car).map(([key, value]) => (
                        <div className="flex">
                            <div className="basis-20">{key}</div>
                            <div>: {value}</div>
                        </div>
                    ))
                }
            </div>

            {/* Timezones */}
            <div className="flex">
                <h4 className="basis-20 mb-2">Timezones</h4>
                <div>: {country.timezones && country.timezones.map(item => item).join(', ')}</div>
            </div>

            {/* Continents */}
            <div className="flex">
                <h4 className="basis-20 mb-2">Continents</h4>
                <div>: {country.continents && country.continents.map(item => item).join(', ')}</div>
            </div>

            {/* Flags */}
            <div className="flex flex-col gap-2 mb-2">
                <h4>Flags</h4>
                {
                    Object.entries(country.flags).map(([key, value]) => (
                        <div className="flex">
                            <div className="basis-20">{key}</div>
                            <div className="flex-1">: {value}</div>
                        </div>
                    ))
                }
            </div>

            {/* coatOfArms */}
            <div className="flex flex-col gap-2 mb-2">
                <h4>Coat Of Arms</h4>
                {
                    Object.entries(country.coatOfArms).map(([key, value]) => (
                        <div className="flex">
                            <div className="basis-20">{key}</div>
                            <div>: {value}</div>
                        </div>
                    ))
                }
            </div>

            {/* Capital Info */}
            <div className="flex flex-col gap-2 mb-2">
                <h4>Capital Info</h4>
                {
                    Object.entries(country.capitalInfo).map(([key, value]) => (
                        <div className="flex">
                            <div className="basis-20">{key}</div>
                            <div>: {value.map(item => item).join(', ')}</div>
                        </div>
                    ))
                }
            </div>

            {/* StartOfWeek */}
            <div className="flex">
                <h4 className="basis-20 mb-2">Start Of Week</h4>
                <div>: {country.startOfWeek}</div>
            </div>
        </div>
    </div>
);

export default Modal;