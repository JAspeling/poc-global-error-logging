import * as chalk from 'chalk';

interface CLIMessageConfig {
  title: string;
  label?: string;
  body?: string[];
}

/**
 *  Usage:
 *
 *  output.single('Single line of output');
 *  output.log({
 *    title: 'Default log message with title',
 *    body: ['and one or more', 'optional body lines'],
 *  });
 *  output.note({title: 'Log note message',body: ['This is like an info message']});
 *  output.warn({ title: 'Log warning message' });
 *  output.error({ title: 'Log error message' });
 *  output.success({ title: 'Log success message' });
 */

class CLIOutput {
  private SENSES_PREFIX = `${chalk.reset.inverse.bold.hex('#007abd')(
    ' SENSES '
  )}`;

  private writeToStdOut(str: string) {
    process.stdout.write(str);
  }

  private writeOutputTitle({
    label,
    title,
  }: {
    label?: string;
    title: string;
  }): void {
    // Don't show SENSES as prefix in the pipeline
    if (process.env.CI === 'True') {
      this.SENSES_PREFIX = '';
    }
    this.writeToStdOut(
      `\n${this.SENSES_PREFIX} ${label ? label + ' ' : ''}${title}\n`
    );
  }

  private writeOptionalOutputBody(body?: string[]): void {
    if (!body) {
      return;
    }
    this.writeToStdOut('\n');
    body.forEach(line => this.writeToStdOut('  ' + line + '\n'));
    this.writeToStdOut('\n');
  }

  error({ title, body }: CLIMessageConfig) {
    this.writeOutputTitle({
      label: chalk.reset.inverse.bold.hex('#e84855')(' ERROR '),
      title: chalk.bold.hex('#e84855')(title),
    });

    this.writeOptionalOutputBody(body);
  }

  warn({ title, body }: CLIMessageConfig) {
    this.writeOutputTitle({
      label: chalk.reset.inverse.bold.hex('#f9dc5c')(' WARNING '),
      title: chalk.bold.hex('#f9dc5c')(title),
    });

    this.writeOptionalOutputBody(body);
  }

  note({ title, body }: CLIMessageConfig) {
    this.writeOutputTitle({
      label: chalk.reset.inverse.bold.hex('#90d1e2')(' NOTE '),
      title: chalk.bold.hex('#90d1e2')(title),
    });

    this.writeOptionalOutputBody(body);
  }

  success({ title, body }: CLIMessageConfig) {
    this.writeOutputTitle({
      label: chalk.reset.inverse.bold.hex('#36b065')(' SUCCESS '),
      title: chalk.bold.hex('#36b065')(title),
    });

    this.writeOptionalOutputBody(body);
  }

  single(message: string) {
    this.writeOutputTitle({
      title: message,
    });
  }

  log({ title, body }: CLIMessageConfig) {
    this.writeOutputTitle({
      title: chalk.white(title),
    });

    this.writeOptionalOutputBody(body);
  }

  custom({ title, label, body }: CLIMessageConfig) {
    this.writeOutputTitle({
      label: chalk.reset.inverse.bold.hex('#36b065')(
        ` ${label.toUpperCase()} `
      ),
      title: chalk.bold.white(title),
    });

    this.writeOptionalOutputBody(body);
  }
}

export const output = new CLIOutput();
