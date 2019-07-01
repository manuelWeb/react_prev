import React, { Component } from 'react'
import { IAdressCustomerModel } from '../../models/createUpdateCustomerModel'

class AddressData extends Component<
  {
    address: IAdressCustomerModel
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  },
  {}
> {
  private handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void

  constructor(props: {
    address: IAdressCustomerModel
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  }) {
    super(props)
    this.handleChange = this.props.handleChange
  }

  public render() {
    const content = this.conditionalRender()
    return <div>{content}</div>
  }

  private conditionalRender(): JSX.Element {
    if (this.handleChange !== undefined) {
      return (
        <div>
          <section className="grid-2">
            <div>
              <label htmlFor="numeroVoie">Numéro de la voie :</label>
            </div>
            <div>
              <input
                type="tel"
                id="numeroVoie"
                name="AdressCustomer.TrackNumber"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="typevoie">Type de la voie :</label>
            </div>
            <div>
              <input
                type="text"
                id="typevoie"
                name="AdressCustomer.TypeTrack"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="libelleVoie">Libelle de la voie :</label>
            </div>
            <div>
              <input
                type="text"
                id="libelleVoie"
                name="AdressCustomer.LabelTrack"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="complementAdresse">Complément d'adresse :</label>
            </div>
            <div>
              <input
                type="text"
                id="complementAdresse"
                name="AdressCustomer.AdditionalAdress"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="codePostal">Code postal :</label>
            </div>
            <div>
              <input
                type="tel"
                id="codePostal"
                name="AdressCustomer.PostalCode"
                maxLength={5}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="ville">Ville :</label>
            </div>
            <div>
              <input
                type="text"
                id="ville"
                name="AdressCustomer.City"
                onChange={this.handleChange}
              />
            </div>
          </section>
        </div>
      )
    } else {
      return (
        <div>
          <section className="grid-2">
            <div>
              <label htmlFor="numeroVoie">Numéro de la voie :</label>
            </div>
            <div>
              <label>{this.props.address.TrackNumber}</label>
            </div>
            <div>
              <label htmlFor="typevoie">Type de la voie :</label>
            </div>
            <div>{this.props.address.TypeTrack}</div>
            <div>
              <label htmlFor="libelleVoie">Libelle de la voie :</label>
            </div>
            <div>{this.props.address.LabelTrack}</div>
            <div>
              <label htmlFor="complementAdresse">Complément d'adresse :</label>
            </div>
            <div>{this.props.address.AdditionalAdress}</div>
            <div>
              <label htmlFor="codePostal">Code postal :</label>
            </div>
            <div>{this.props.address.PostalCode}</div>
            <div>
              <label htmlFor="ville">Ville :</label>
            </div>
            <div>{this.props.address.City}</div>
          </section>
        </div>
      )
    }
  }
}

export default AddressData
