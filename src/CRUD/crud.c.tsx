import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText, InputLabel,
    MenuItem,
    Select,
    TextField,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import { BaseSyntheticEvent } from 'react';

import { GeneratorFields } from '../@enums/generator.enums';
import {
    IGeneratorField,
    IGeneratorFieldDefault,
    IGeneratorInputField,
    IGeneratorSelectField,
} from '../@interfaces/generator.interface';
import { CrudClient } from './crud.client';
import {
    ICrudCProps,
    ICrudCState,
    ICrudCStateTarget,
} from './interfaces/crud.c.interfaces';

const styles = (theme: Theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    formControlInput: {
        minWidth: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    nullableSelectActive: {
        marginTop: theme.spacing(1),
    },
    nullableSelectInactive: {
        marginBottom: theme.spacing(1),
    },
});

interface Props extends ICrudCProps, WithStyles<typeof styles> {}

class CrudCreateUpdate extends React.Component<Props, ICrudCState> {
    static defaultProps: Partial<Props> = {
        onClose: (data: ICrudCStateTarget) => Promise.resolve(data),
        options: {
            lal: { field: GeneratorFields.INPUT, default: null },
            lal2: {
                field: GeneratorFields.INPUT,
                default: null,
            },
            lal3: {
                field: GeneratorFields.INPUT,
                default: null,
            },
            fal: {
                field: GeneratorFields.CHECK_BOX,
                default: null,
            },
            sel: {
                field: GeneratorFields.SELECT,
                default: '',
                isNullable: true,
                values: [
                    { id: 1, title: 'first rgnrwnejfwne w ' },
                    { id: 2, title: 'second' },
                ],
            },
        },
        toUpdate: {
            lal: 'Hi',
            lal2: 'Hi',
            lal3: 'Hi',
            fal: true,
            sel: 2,
        },
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            target: {},
            errors: {},
        };
    }

    componentDidMount() {
        this.initDefaultTargetValue();
    }

    protected initDefaultTargetValue() {
        this.setState({
            target: Object.keys(this.props.options).reduce((acc, curr) => {
                const defaultValue = this.props.options[curr].field === GeneratorFields.CHECK_BOX
                    ? false
                    : null;

                const value = this.props.toUpdate
                    ? this.props.toUpdate[curr]
                    : this.props.options[curr].default;

                return { [curr]: value || defaultValue, ...acc };
            }, {}),
        });
    }

    protected updateTarget(value: number | string | null | boolean, key: string) {
        this.setState((state) => ({
            target: { ...state.target, [key]: value },
        }));
    }

    protected renderInput(options: IGeneratorInputField, key: string) {
        return (
          <FormControl className={`${this.props.classes.formControl} ${this.props.classes.formControlInput}`} key={key}>
            <TextField
              value={this.state.target[key] || ''}
              onInput={(event: BaseSyntheticEvent) => this.updateTarget(event.target.value || null, key)}
              label={key}
              type={options.type || 'text'}
              variant="outlined"
              error={!!this.state.errors[key]}
              helperText={this.state.errors[key]}
              size="small"
            />
          </FormControl>
        );
    }

    protected renderCheckBox(_options: IGeneratorFieldDefault, key: string) {
        return (
          <FormControl className={this.props.classes.formControl} key={key} error={!!this.state.errors[key]}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={!!this.state.target[key]}
                  onChange={() => this.updateTarget(!this.state.target[key], key)}
                  color="primary"
                />
              )}
              label={key}
            />
            {this.state.errors[key] && (
            <FormHelperText>{this.state.errors[key]}</FormHelperText>
            )}
          </FormControl>
        );
    }

    protected renderSelect(options: IGeneratorSelectField, key: string) {
        const isShrink = options.isNullable ? { shrink: true } : {};

        return (
          <FormControl
            className={`${this.props.classes.formControl} ${this.props.classes.formControlInput}`}
            size="small"
            variant="outlined"
            error={!!this.state.errors[key]}
            key={key}
          >
            <InputLabel {...isShrink} htmlFor={key}>
              {key}
            </InputLabel>
            <Select
              label={key}
              value={this.state.target[key] ?? ''}
              onChange={(event: BaseSyntheticEvent) => this.updateTarget(
                        event.target.value !== '' ? event.target.value : null,
                        key,
                    )}
              displayEmpty={!!options.isNullable}
              className={
                  options.isNullable && !this.state.target[key]
                      ? this.props.classes.nullableSelectActive : this.props.classes.nullableSelectInactive
              }
            >
              {options.isNullable && (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
                    )}
              {options.values.map(({ id, title }) => (
                <MenuItem style={{ width: '100%' }} key={id} value={id}>
                  {title}
                </MenuItem>
                    ))}
            </Select>
            {this.state.errors[key] && (
            <FormHelperText error={!!this.state.errors[key]}>
              {this.state.errors[key]}
            </FormHelperText>
            )}
          </FormControl>
        );
    }

    protected renderField(options: IGeneratorField, key: string) {
        switch (options.field) {
            case GeneratorFields.INPUT:
                return this.renderInput(options as IGeneratorInputField, key);
            case GeneratorFields.CHECK_BOX:
                return this.renderCheckBox(options, key);
            case GeneratorFields.SELECT:
                return this.renderSelect(options as IGeneratorSelectField, key);
            default:
                // TODO: fix it;
                throw new Error('FIX ME');
        }
    }

    protected renderForm() {
        return Object.keys(this.props.options).map((key) => this.renderField(this.props.options[key], key));
    }

    handleAccept() {
        const method = this.props.onAccess;
        const id = this.props.idKey && this.props.toUpdate ? this.props.toUpdate[this.props.idKey] : null;
        if (id) {
            return (method as CrudClient['update'])(id, this.state.target);
        }

        return (method as CrudClient['create'])(this.state.target);
    }

    render() {
        return (
          <div>
            {this.renderForm()}
            <div
              className="buttons"
              style={{ display: 'flex', justifyContent: 'space-around' }}
            >
              <Button
                variant="contained"
                onClick={() => this.props.onClose(this.state.target)}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleAccept.bind(this)}
              >
                {this.props.toUpdate ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        );
    }
}

export const CrudC = withStyles(styles)(CrudCreateUpdate);
