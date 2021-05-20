import React from 'react';

export class CrudR extends React.Component<{ toRead: { [key: string]: any } }, any> {
    static defaultProps = {
        toRead: {
            lal: 'Hi',
            lal2: 'Hi',
            lal3: 'Hi',
            fal: true,
            sel: 2,
        },
    };

    get data() {
        return this.props.toRead;
    }

    get dataKeys() {
        return Object.keys(this.props?.toRead || {});
    }

    render() {
        return (
          <div>
            {this.dataKeys.map((key) => (
              <p key={key}>
                <b>
                  {key}
                  :
                  {' '}
                </b>
                {this.data[key] || 'НЕТ'}
              </p>
))}
          </div>
        );
    }
}
